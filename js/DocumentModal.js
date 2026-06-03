
function ShowAlert(message, type) {
  // Store alert in sessionStorage for persistence after reload
  sessionStorage.setItem(
    "pendingAlert",
    JSON.stringify({
      message: message,
      type: type,
    }),
  );

  displayAlert(message, type);
}

function displayAlert(message, type) {
  let body = document.getElementsByTagName("body")[0];
  let alertBox = document.createElement("div");
  alertBox.className = "alert-box";
  alertBox.textContent = message;
  document.body.appendChild(alertBox);
  alertBox.style.opacity = "0.7";
  alertBox.style.position = "fixed";
  alertBox.style.top = "20px";
  alertBox.style.right = "20px";
  alertBox.style.padding = "15px";
  alertBox.style.color = "white";
  alertBox.style.borderRadius = "5px";
  alertBox.style.zIndex = "1000";
  alertBox.style.transition = "opacity 0.5s ease";
  alertBox.style.borderRadius = "10px";
  alertBox.style.fontFamily = "Arial, sans-serif";
  alertBox.style.fontSize = "16px";
  if (type == "alert") {
    alertBox.style.backgroundColor = "#f44336";
  } else if (type == "success") {
    alertBox.style.backgroundColor = "#4CAF50";
  } else {
    alertBox.style.backgroundColor = "#333";
  }

  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// Check for pending alerts when page loads
window.addEventListener("load", function () {
  const pendingAlert = sessionStorage.getItem("pendingAlert");
  if (pendingAlert) {
    try {
      const alertData = JSON.parse(pendingAlert);
      displayAlert(alertData.message, alertData.type);
      sessionStorage.removeItem("pendingAlert");
    } catch (e) {
      console.error("Error displaying pending alert:", e);
      sessionStorage.removeItem("pendingAlert");
    }
  }
});



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
        ShowAlert("Sikeres mentés!", "success");
        addDocumentToUI(title, datum);
        closeRecruitmentModal();
      } else {
        console.error("Szerver hiba:", xhr.responseText);
        Alert("Szerver hiba: " + xhr.responseText);
      }
    }
  };

  console.log("Küldés folyamatban...", docData);
  xhr.send(JSON.stringify(docData));
}

let UserP = "";

function getProfileData() {
  const API_URL = `${API_BASE_URL}/profiles/id/`;

  var xhlProfile = new XMLHttpRequest();
  xhlProfile.open("POST", API_URL, true);
  xhlProfile.setRequestHeader("Content-Type", "application/json");

  xhlProfile.onreadystatechange = function () {
    // 4 = Kész, 200 = OK
    if (xhlProfile.readyState === 4) {
      if (xhlProfile.status === 200) {
        try {
          var response = JSON.parse(xhlProfile.responseText);
          if (response.user && response.user.Name) {
            UserP = response.user.Name;

            console.log("Siker! UserP értéke mostantól:", UserP);

            megjelenites(UserP);
          } else {
            console.error("A válaszban nem található 'user' vagy 'Name' mező!");
          }
        } catch (e) {
          console.error("Hiba a JSON feldolgozása közben:", e);
        }
      } else {
        console.error("Szerver hiba! Státuszkód:", xhlProfile.status);
      }
    }
  };

  const profileId = localStorage.getItem("Profile");

  xhlProfile.send(
    JSON.stringify({
      id: profileId,
    }),
  );
}

function megjelenites(nev) {
  UserP = nev;
}

getProfileData();

console.log(UserP + "ez a nevem");

function formatDate(isoString) {
  if (!isoString) return "Nincs dátum";

  const date = new Date(isoString);

  return date.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

var xhrPrivateDocsAlkID = new XMLHttpRequest();
// Ellenőrizd, hogy az URL pontosan ez-e!
xhrPrivateDocsAlkID.open(
  "POST",
  `${API_BASE_URL}/docs/private/alkalmazottId`,
  true,
);
xhrPrivateDocsAlkID.setRequestHeader("Content-Type", "application/json");

xhrPrivateDocsAlkID.onreadystatechange = function () {
  if (xhrPrivateDocsAlkID.readyState === 4) {
    if (xhrPrivateDocsAlkID.status === 200) {
      try {
        const response = JSON.parse(xhrPrivateDocsAlkID.responseText);
        console.log("Privát adatok beérkeztek:", response);

        // A válaszban a 'documents' kulcsot keressük, ahogy a publikusnál is

        if (response.documents && Array.isArray(response.documents)) {
          const container = document.getElementById("docs-list-container");
          container.innerHTML = "";

          response.documents.forEach((doc) => {
            // Átadjuk az ID-t, a Címet, a Dátumot és a Tartalmat
            LoadDocumentToUI(
              doc.Document_ID,
              doc.Document_Title,
              formatDate(doc.CreationDate),
              doc.Document_Content, // Ez a szöveg kerül majd a BoxP-be
            );
          });
        } else {
          console.warn(
            "Nincsenek privát dokumentumok vagy rossz a válasz formátuma.",
          );
        }
      } catch (e) {
        console.error("Hiba a privát JSON feldolgozásakor:", e);
      }
    } else {
      // Itt látod majd az 500-as hiba részleteit a konzolban
      console.error("Szerver hiba (Privát):", xhrPrivateDocsAlkID.status);
      console.log("Szerver válaszüzenete:", xhrPrivateDocsAlkID.responseText);
    }
  }
};

// Küldés a sessionStorage-ben lévő cég ID-val
const selectedComp = localStorage.getItem("Profile");
console.log(selectedComp + " ez az id");
if (selectedComp) {
  xhrPrivateDocsAlkID.send(
    JSON.stringify({
      profileId: selectedComp,
    }),
  );
} else {
  console.error("Nincs kiválasztva cég (SelectedCompany hiányzik)!");
}

var xhrPublicDocs = new XMLHttpRequest();
xhrPublicDocs.open("POST", `${API_BASE_URL}/docs/public/`, true);
xhrPublicDocs.setRequestHeader("Content-Type", "application/json");

xhrPublicDocs.onreadystatechange = function () {
  if (xhrPublicDocs.readyState === 4) {
    if (xhrPublicDocs.status === 200) {
      try {
        const response = JSON.parse(xhrPublicDocs.responseText);
        console.log("Adatok beérkeztek:", response);

        if (response.documents && Array.isArray(response.documents)) {
          const container = document.getElementById("docs-list-container");
          container.innerHTML = "";

          response.documents.forEach((doc) => {
            // Átadjuk az ID-t, a Címet, a Dátumot és a Tartalmat
            LoadDocumentToUI(
              doc.Document_ID,
              doc.Document_Title,
              formatDate(doc.CreationDate),
              doc.Document_Content, // Ez a szöveg kerül majd a BoxP-be
            );
          });
        } else {
          console.error("A 'documents' mező nem található vagy nem lista!");
        }
      } catch (e) {
        console.error("JSON hiba:", e);
      }
    }
  }
};

// Küldés (ne felejtsd el a body-t, ha szükséges az API-nak)
const companyId = sessionStorage.getItem("SelectedCompany");
xhrPublicDocs.send(JSON.stringify({ companyid: companyId }));

function LoadDocumentToUI(id, title, date, content) {
  const container = document.getElementById("docs-list-container");
  if (!container) return;

  // Létrehozzuk az elemet
  const docElement = document.createElement("div");
  docElement.className = "docs-item";

  docElement.innerHTML = `
        <div class="docs-item-inner">
            <img src="../assets/docs-icon.svg" alt="" />
            <div class="docs-item-text">
                <h2>${title}</h2>
                <p>Megosztva: ${typeof UserP !== "undefined" ? UserP : "Rendszer"} - <span class="doc-date">${date}</span></p>
            </div>
        </div>
        <div class="docs-item-buttons">
            <button class="docs-item-button open-btn">Megnyitás</button>
            <button class="docs-item-button" id="${id}" onclick="torles(${id})">Törlés</button>
        </div>
    `;

  // Megkeressük a gombot az új elemen belül és rákötjük a funkciót
  const btn = docElement.querySelector(".open-btn");
  btn.onclick = function () {
    console.log("Kattintás történt a dokumentumra:", title);
    OpenDocument(title, content);
  };

  container.appendChild(docElement);
}


function torles(docid) {
  console.log("Törlés indítása, ID:", docid);

  // Megerősítés a felhasználótól (biztonsági lépés)
  if (!confirm("Biztosan törölni szeretnéd ezt a dokumentumot?")) {
    return;
  }

  var xhrDelete = new XMLHttpRequest();
  xhrDelete.open("POST", `${API_BASE_URL}/docs/delete/`, true);
  xhrDelete.setRequestHeader("Content-Type", "application/json");

  xhrDelete.onreadystatechange = function () {
    // Figyelem: Itt xhrDelete-et kell használni, nem xhr-t!
    if (xhrDelete.readyState === 4) {
      if (xhrDelete.status === 200) {
        ShowAlert("Sikeres törlés!", "success");
        // Frissítsük az oldalt, hogy eltűnjön a törölt elem
        location.reload();
      } else {
        console.error("Szerver hiba:", xhrDelete.responseText);
        alert("Hiba történt a törlés során!");
      }
    }
  };

  // A .send()-nek a függvényen KÍVÜL kell lennie!
  xhrDelete.send(
    JSON.stringify({
      id: docid,
    }),
  );
}

function OpenDocument(title, content) {
  console.log("Megnyitás indítása:", title);

  const box = document.getElementById("Box");
  const h1 = document.getElementById("BoxH1");
  const p = document.getElementById("BoxP");

  if (box && h1 && p) {
    // Áthelyezzük a Box-ot a body közvetlen gyerekévé, hogy ne takarja el semmi
    document.body.appendChild(box);

    h1.innerText = title;
    p.innerText = content || "Nincs tartalom.";

    // Kényszerített stílusok JS-ből
    box.style.display = "flex";
    box.style.position = "fixed";
    box.style.top = "0";
    box.style.left = "0";
    box.style.width = "100vw";
    box.style.height = "100vh";
    box.style.zIndex = "999999"; // Brutálisan magas rétegrend
    box.style.backgroundColor = "rgba(0,0,0,0.85)";

    console.log("Box megjelenítve!");
  } else {
    alert("Hiba: A Box elemek nem találhatók a HTML-ben!");
  }
}
function addDocumentToUI(title, date) {
  const container = document.getElementById("docs-list-container");

  const docHTML = `
        <div class="docs-item">
            <div class="docs-item-inner">
                <img src="../assets/docs-icon.svg" alt="" />
                <div class="docs-item-text">
                    <h2>${title}</h2>
                    <p>Megosztva: ${UserP} - <span class="doc-date">${date}</span></p>
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
  window.location.reload();
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
