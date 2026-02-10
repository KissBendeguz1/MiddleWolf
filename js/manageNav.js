sidebar = document.getElementsByClassName("sidebar-container")[0];
nav = document.getElementsByClassName("nav-container")[0];
console.log(nav);
menudiv = document.createElement("div");
menudiv.classList.add("hidden");
menudiv.id = "sidemenuopen";
menudiv.innerHTML += `
<svg class="svg-invert" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
menudiv.setAttribute("onclick", "toggleNav()");
menudiv.setAttribute("onload", "LoadNavMenu()");
nav.prepend(menudiv);

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

function toggleNav() {
  sidebar.classList.toggle("hidden");
}

LoadNavMenu()
