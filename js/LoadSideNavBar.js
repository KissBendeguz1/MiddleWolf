const darkModeScript = document.createElement("script");
darkModeScript.src = "../js/DarkMode.js";
document.head.appendChild(darkModeScript);
const sidebar = document.getElementsByClassName("sidebar-item-container")[0];

var account = document.getElementsByClassName("account_log_in_out");

function checkUserType() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://78.92.125.103:6969/api/profiles/id/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response.user.Type);
        console.log(response);
        if (
          response.user.Type === "company" &&
          sessionStorage.getItem("SelectedCompany").length > 0
        ) {
          console.log(
            "Céges felhasználó és van aktív cég ID" +
              sessionStorage.getItem("SelectedCompany") +
              "//" +
              sessionStorage.getItem("SelectedCompany").length,
          );
          LoadNavCeges();
        } else if (response.user.Type === "company") {
          console.log(
            "Céges felhasználó, de nincs aktív cég ID" +
              sessionStorage.getItem("SelectedCompany"),
          );
          LoadNavCegRegisztralo();
        } else {
          console.log("Nem céges felhasználó");
          LoadNavPrivate();
        }
      } else {
        console.error("Hiba a profil lekérése során: " + xhr.status);
      }
    }
  };

  xhr.send(
    JSON.stringify({
      id: localStorage.getItem("Profile"),
    }),
  );
}

function LoadNavPrivate() {
  console.log("LoadNavPrivate futtatva");
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://78.92.125.103:6969/api/employee/profileId/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        if ((response != "Az alkalmazott nem található")&&(response.employees.Comp_ID > 0)) {
          console.log("Alkalmazott, aki egy céghez tartozik");
          const sideNavBarHTML = `<hr id="logged_in_navbar_hr">

            <a href="../html/docs.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/document.svg" alt="" />
                  <h2>Dokumentumok</h2>
                </div>
                
            </a>

            <a href="../html/messages.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/message.svg" alt="" />
                  <h2>Üzenetek</h2>
                </div>
                
            </a>

            <a href="../html/alerts.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/alert.svg" alt="" />
                  <h2>Értesítések</h2>
                </div>
                
            </a>`;

          sidebar.innerHTML += sideNavBarHTML;
        } else {
          console.log("Alkalmazott, aki nem tartozik egy céghez sem");
          const sideNavBarHTML = `<hr id="logged_in_navbar_hr"> 
            <a href="../html/ceges/review.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/message.svg" alt="" />
                  <h2>Értékelések</h2>
                </div>`;
          sidebar.innerHTML += sideNavBarHTML;
        }
      } else {
        console.error(
          "Hiba az alkalmazott profil lekérése során: " + xhr.status,
        );
      }
    }
  };
  xhr.send(
    JSON.stringify({
      profileId: localStorage.getItem("Profile"),
    }),
  );
}

function LoadNavCeges() {
  console.log("LoadNavCeges futtatva");
  const sideNavBarHTML = `<hr id="logged_in_navbar_hr">
            <a href="../html/logged-in-index.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/dashboard.svg" alt="" />
                  <h2>Áttekintés</h2>
                </div>
                
            </a>
            <a href="../html/docs.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/document.svg" alt="" />
                  <h2>Dokumentumok</h2>
                </div>
                
            </a>
            <a href="../html/employees.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/people.svg" alt="" />
                  <h2>Alkalmazottak</h2>
                </div>
                
            </a>

            <a href="../html/messages.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/message.svg" alt="" />
                  <h2>Üzenetek</h2>
                </div>
                
            </a>

            <a href="../html/alerts.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/alert.svg" alt="" />
                  <h2>Értesítések</h2>
                </div>
                
            </a>`;

  sidebar.innerHTML += sideNavBarHTML;
}

function LoadNavCegRegisztralo() {
  const sideNavBarHTML = `<hr id="logged_in_navbar_hr">
    <a href="../html/ceges/company-register.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/dashboard.svg" alt="" />
                  <h2>Cégek</h2>
                </div>
                
            </a>`;
  sidebar.innerHTML += sideNavBarHTML;
}

document.addEventListener(
  "DOMContentLoaded",
  (e) => {
    e.preventDefault();
    checkUserType();
  },
  /*if (sessionStorage.getItem("Type") === "Ceges") { */
  /* const sideNavBarHTML = `<hr id="logged_in_navbar_hr">
    <a href="../html/compamy-register.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/dashboard.svg" alt="" />
                  <h2>Cégek</h2>
                </div>
                
            </a>
    `*/

  /*
   `<hr id="logged_in_navbar_hr">
    <a href="../html/compamy-register.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/dashboard.svg" alt="" />
                  <h2>Cégek</h2>
                </div>
                
            </a>`
   
   
   if (sessionStorage.getItem("Type") === "Ceges" || localStorage.getItem('Load') === true) {
        const sideNavBarHTML =`<hr id="logged_in_navbar_hr">
            <a href="../html/logged-in-index.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/dashboard.svg" alt="" />
                  <h2>Áttekintés</h2>
                </div>
                
            </a>
            <a href="../html/docs.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/document.svg" alt="" />
                  <h2>Dokumentumok</h2>
                </div>
                
            </a>
            <a href="../html/employees.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/people.svg" alt="" />
                  <h2>Alkalmazottak</h2>
                </div>
                
            </a>

            <a href="../html/messages.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/message.svg" alt="" />
                  <h2>Üzenetek</h2>
                </div>
                
            </a>

            <a href="../html/alerts.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/alert.svg" alt="" />
                  <h2>Értesítések</h2>
                </div>
                
            </a>`*/
);
