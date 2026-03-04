function submitRecruitment() {
  // 1. Adatok begyűjtése
  const rawProfileId = localStorage.getItem("Profile");
  const rawCompanyId = sessionStorage.getItem("SelectedCompany");

  // Debug: Nézzük meg a konzolban, mit lát a JS (F12-nél látható)
  console.log("Tárolt Profil ID:", rawProfileId);
  console.log("Tárolt Cég ID:", rawCompanyId);

  const title = document.getElementById("recruitment-position-title").value;
  const content = document.getElementById("recruitment-position-content").value;
  const type = document.getElementById("available-employees").value;

  if (!rawProfileId || !rawCompanyId || rawProfileId === "undefined") {
    alert("Hiba: Nincs bejelentkezett profil vagy kiválasztott cég!");
    return;
  }

  const d = new Date();
  const datum = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

  // 2. Az adatobjektum pontosan az API által elvárt kulcsokkal
  const docData = {
    title: title,
    content: content,
    types: type,
    creationdate: datum,
    companyid: parseInt(rawCompanyId),
    profileid: parseInt(rawProfileId),
  };

  // 3. Közvetlen küldés az API-nak (kihagyva az extra ellenőrzést)
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `${API_BASE_URL}/createDocs`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        alert("Sikeres mentés!");
        addDocumentToUI(title, datum);
        closeRecruitmentModal();
      } else {
        // Ha itt kapsz ER_NO_REFERENCED_ROW hibát, akkor az ID tényleg nincs az adatbázisban
        console.error("Szerver hiba:", xhr.responseText);
        alert("Szerver hiba: " + xhr.responseText);
      }
    }
  };

  console.log("Küldés folyamatban...", docData);
  xhr.send(JSON.stringify(docData));
}

function addDocumentToUI(title, date) {
  const container = document.getElementById("docs-list-container");

  const docHTML = `
        <div class="docs-item">
            <div class="docs-item-inner">
                <img src="../assets/docs-icon.svg" alt="" />
                <div class="docs-item-text">
                    <h2>${title}</h2>
                    <p>Megosztva: Én - <span class="doc-date">${date}</span></p>
                </div>
            </div>
            <div class="docs-item-buttons">
                <button class="docs-item-button">Megnyitás</button>
                <button onclick="ShowAlert('Még nem elkészült funkció', 'alert')" class="docs-item-button">Szerkesztés</button>
            </div>
        </div>
    `;

  // Az elejére szúrjuk be
  container.insertAdjacentHTML("afterbegin", docHTML);
}

// DocumentModal.js

function openRecruitmentModal() {
  const modal = document.getElementById("recruitment-modal");
  if (modal) {
    modal.style.display = "flex";
    const form = document.getElementById("recruitment-form");
    if (form) form.reset();

    // Ha van ilyen függvényed az alkalmazottak betöltéséhez:
    if (typeof loadAvailableEmployees === "function") {
      loadAvailableEmployees();
    }
  } else {
    console.error("Nem található a 'recruitment-modal' ID-jú elem!");
  }
}

function closeRecruitmentModal() {
  const modal = document.getElementById("recruitment-modal");
  if (modal) {
    modal.style.display = "none";
  }
}
