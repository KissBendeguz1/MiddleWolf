const darkModeScript = document.createElement('script');
darkModeScript.src = '../js/DarkMode.js';
document.head.appendChild(darkModeScript);
const sidebar = document.getElementsByClassName("sidebar-item-container")[0];

var account = document.getElementsByClassName('account_log_in_out');

function checkUserType() { 
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://78.92.114.56:6969/api/profiles/id/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response.user.Type)
        console.log(response)
        if (response.Type === "company" && sessionStorage.getItem("ActiveCompanyID").length >= 0) {
          LoadNavCeges();

        } else if (response.user.Type === "company") {
          LoadNavCegRegisztralo();
        } else {
          LoadNavPrivate();
        };
      } else {
        console.error("Hiba a profil lekérése során: " + xhr.status);
      }
    }
  }


  xhr.send(
    JSON.stringify({
      id: localStorage.getItem("Profile"),
    }),
  );
}

function LoadNavCegRegisztralo() { 
  const sideNavBarHTML = `<hr id="logged_in_navbar_hr">
    <a href="../html/ceges/company-register.html">
                <div class="sidebar-item">
                  <img class="sidebar-icon" src="../assets/dashboard.svg" alt="" />
                  <h2>Cégek</h2>
                </div>
                
            </a>`
  sidebar.innerHTML += sideNavBarHTML;
}

document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault()
  checkUserType();
}
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
