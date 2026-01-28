const darkModeScript = document.createElement('script');
darkModeScript.src = '../js/DarkMode.js';
document.head.appendChild(darkModeScript);

document.addEventListener('DOMContentLoaded', (e) =>{
    e.preventDefault()
    if (sessionStorage.getItem("Login") === "true") {
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
                
            </a>`

    const sideBarItemHolder = document.getElementsByClassName(
      "sidebar-item-container",
    );
    sideBarItemHolder[0].appendChild(document.createRange().createContextualFragment(sideNavBarHTML));

    }

    if(localStorage.getItem('Load') === false && sessionStorage.getItem("Login") === "false"){
        for(let i in account){
        account[i].innerHTML = "Bejelentkezés";
        account[i].href = "../html/login.html";
      }
    }
}
});

var account = document.getElementsByClassName('account_log_in_out');

for(let i of account){
  if(i.innerHTML !== "Regisztráció"){
    for (let i of account) {
      i.addEventListener('click', (e) =>{
        e.preventDefault();
        console.log("asd")
        sessionStorage.clear();
      }) 
    }
  }
}
