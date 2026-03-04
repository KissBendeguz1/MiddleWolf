// 1. DOKUMENTUMOK BETÖLTÉSE (ADATBÁZISBÓL FRISSÍTÉSKOR)
function loadDocuments() {
  const rawCompanyId = sessionStorage.getItem("SelectedCompany");
  const container = document.getElementById("docs-list-container");

  if (!rawCompanyId) return;

  const requestData = {
    companyid: parseInt(rawCompanyId)
  };

  var xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}/docs/public`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          // Mivel a backend így küldi: { documents: [ {Title: '...', ...}, ... ] }
          const documents = response.documents || []; 

          if (container) container.innerHTML = ""; // Konténer ürítése

          documents.forEach(doc => {
            // A MySQL gyakran nagybetűvel adja vissza a mezőket, kezeljük mindkettőt
            const title = doc.Title || doc.title;
            const date = doc.CreationDate || doc.creationdate || doc.datum;
            addDocumentToUI(title, date);
          });
        } catch (e) {
          console.error("Hiba a JSON feldolgozásakor:", e);
        }
      } else {
        console.error("API Hiba:", xhr.status, xhr.responseText);
      }
    }
  };

  xhr.send(JSON.stringify(requestData));
}

// 2. DINAMIKUS UI ELEM HOZZÁADÁSA (Ezt csak EGYSZER definiáld!)
function addDocumentToUI(title, date) {
  const container = document.getElementById("docs-list-container");
  if (!container) return;

  // Dátum formázása (YYYY.MM.DD)
  let displayDate = "Nincs dátum";
  if (date) {
    // Ha ISO formátum (2024-03-04T...), vágjuk le az időt és cseréljük a kötőjelet
    displayDate = date.split('T')[0].replace(/-/g, '.');
  }

  const docHTML = `
        <div class="docs-item">
            <div class="docs-item-inner">
                <img src="../assets/docs-icon.svg" alt="doc" />
                <div class="docs-item-text">
                    <h2>${title}</h2>
                    <p>Megosztva: Én - <span class="doc-date">${displayDate}</span></p>
                </div>
            </div>
            <div class="docs-item-buttons">
                <button class="docs-item-button">Megnyitás</button>
                <button onclick="ShowAlert('Még nem elkészült funkció', 'alert')" class="docs-item-button">Szerkesztés</button>
            </div>
        </div>
    `;

  container.insertAdjacentHTML("afterbegin", docHTML);
}

// 3. ÚJ DOKUMENTUM MENTÉSE (FORM KÜLDÉS)
function submitRecruitment() {
  const rawProfileId = localStorage.getItem("Profile");
  const rawCompanyId = sessionStorage.getItem("SelectedCompany");

  const title = document.getElementById("recruitment-position-title").value;
  const content = document.getElementById("recruitment-position-content").value;
  const type = document.getElementById("available-employees").value;

  if (!rawProfileId || !rawCompanyId || rawProfileId === "undefined") {
    alert("Hiba: Nincs bejelentkezett profil vagy kiválasztott cég!");
    return;
  }

  const d = new Date();
  const datum = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

  // Itt ellenőrizd a kulcsokat! Ha a backend req.body.companyid-t vár, maradjon így.
// A docData kulcsainak EGYEZNIE KELL azzal, amit a backend req.body-ban vár!
const docData = {
    title: title,
    content: content,
    types: type,        // A backendben Types-ként hivatkozol rá?
    creationdate: datum,
    companyid: parseInt(rawCompanyId), // A backend req.body.companyid-t vár?
    profileid: parseInt(rawProfileId)  // A backend req.body.profileid-t vár?
};

  var xhr = new XMLHttpRequest();
  
  // JAVÍTÁS: Ha a loadDocuments-nél ki kellett venni az /api-t, itt is ki kell!
  // Eredeti: ${API_BASE_URL}/createDocs -> Próbáld meg így:
  xhr.open("POST", `${API_BASE_URL}/createDocs`.replace('/api/api', '/api'), true);
  
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        alert("Sikeres mentés!");
        // Frissítjük a UI-t az új adattal
        addDocumentToUI(title, datum); 
        closeRecruitmentModal();
      } else {
        // Itt nézd meg a konzolt (F12), ha hiba van!
        console.error("Szerver válasza hiba esetén:", xhr.responseText);
        alert("Szerver hiba: " + xhr.status);
      }
    }
  };

  console.log("Küldött adatok:", docData);
  xhr.send(JSON.stringify(docData));
}

// 4. OLDAL BETÖLTÉSEKOR FUTÓ ESEMÉNYEK
document.addEventListener("DOMContentLoaded", () => {
    loadDocuments();
});

// MODAL KEZELÉS (Segédfüggvények)
function openRecruitmentModal() {
  const modal = document.getElementById("recruitment-modal");
  if (modal) {
    modal.style.display = "flex";
    const form = document.getElementById("recruitment-form");
    if (form) form.reset();
    if (typeof loadAvailableEmployees === "function") loadAvailableEmployees();
  }
}

function closeRecruitmentModal() {
  const modal = document.getElementById("recruitment-modal");
  if (modal) modal.style.display = "none";
}