const darkModeScript = document.createElement("script");
darkModeScript.src = "../js/DarkMode.js";
document.head.appendChild(darkModeScript);
const sidebar = document.getElementsByClassName("sidebar-item-container")[0];

var account = document.getElementsByClassName("account_log_in_out");

function checkUserType() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `${API_BASE_URL}/profiles/id/`, true);
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
      ManageNav();
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
  xhr.open("POST", `${API_BASE_URL}/employee/profileId/`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        if (
          response != "Az alkalmazott nem található" &&
          response.employees.Comp_ID > 0
        ) {
          console.log("Alkalmazott, aki egy céghez tartozik");
          sessionStorage.setItem("SelectedCompany", response.employees.Comp_ID);
          sessionStorage.setItem("Profile_Type", "Employee");
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
          sessionStorage.setItem("Profile_Type", "Private");
          const sideNavBarHTML = `<hr id="logged_in_navbar_hr"> 
            <a href="../html/review.html">
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
  sessionStorage.setItem("Profile_Type", "Owner");
  const sideNavBarHTML = `<hr id="logged_in_navbar_hr">
      <a href="../html/company-register.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/dashboard.svg" alt="" />
                  <h2>Cégek</h2>
                </div>
                
            </a>
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
    <a href="../html/company-register.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/dashboard.svg" alt="" />
                  <h2>Cégek</h2>
                </div>
                
            </a>`;
  sidebar.innerHTML += sideNavBarHTML;
}

const account_log_in_out =
  document.getElementsByClassName("account_log_in_out");

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  checkUserType();
  console.log("betölt" + account_log_in_out);
  if (sessionStorage.getItem("Login") === "true") {
    account_log_in_out[0].innerHTML = "Kijelentkezés";
    account_log_in_out[0].href = "";
  } else {
    account_log_in_out[0].innerHTML = "Bejelentkezés";
  }
});

account_log_in_out[0].addEventListener("click", (e) => {
  if (sessionStorage.getItem("Login") === "true") {
    e.preventDefault();
    if (localStorage.getItem("darkMode") === "true") {
      localStorage.removeItem("Profile");
    } else {
      localStorage.clear();
    }
    sessionStorage.clear();
    window.location.href = "../html/index.html";
  }
});

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

function ManageNav() {
  const sidebar = document.getElementsByClassName("sidebar-container")[0];
  const nav = document.getElementsByClassName("nav-container")[0];
  console.log(nav);
  const menudiv = document.createElement("div");
  menudiv.classList.add("hidden");
  menudiv.id = "sidemenuopen";
  menudiv.innerHTML += `
<svg class="svg-invert" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
  menudiv.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });
  menudiv.setAttribute("onload", "LoadNavMenu()");
  nav.prepend(menudiv);
  function toggleNav() {}

  function LoadNavMenu() {
    screenwidth = window.innerWidth;
    if (screenwidth <= 1400) {
      console.log(screenwidth);
      NavMobile();
    } else {
      NavDesktop();
    }

    window.addEventListener("resize", () => {
      screenwidth = window.innerWidth;
      if (screenwidth <= 1400) {
        console.log(screenwidth);
        NavMobile();
      } else {
        NavDesktop();
      }
    });
  }

  function NavMobile() {
    menudiv.classList.remove("hidden");
    sidebar.classList.add("hidden");
  }

  function NavDesktop() {
    menudiv.classList.add("hidden");
    sidebar.classList.remove("hidden");
  }

  LoadNavMenu();
}
