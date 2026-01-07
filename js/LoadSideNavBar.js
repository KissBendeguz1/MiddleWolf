function Load() {
    body = document.body;
    body.innerHTML = `<nav>
      <section class="nav-container">
        <img
          id="nav-logo-big"
          class="nav-img"
          src="../assets/Logo1.png"
          alt=""
        />
      </section>
      <section class="nav-container">
        <input
          type="text"
          name="navsearch"
          id="search"
          placeholder="Search..."
        />
        <div id="nav-profile">
          <img
            id="nav-profile-img"
            class="nav-img"
            src="../assets/nav-logo-placeholder.jpg"
            alt=""
          />
          <h1>Név</h1>
        </div>
      </section>
    </nav>
    <section class="sidebar-container">
      <div class="sidebar-item-container">
        <a href="../html/index.html">
            <div class="sidebar-item">
              <img class="sidebar-icon" src="../assets/main.png" alt="" />
              <h2>Főoldal</h2>
            </div>
        </a>
        <a href="../html/about.html">
            <div class="sidebar-item">
              <img class="sidebar-icon" src="../assets/about.png" alt="" />
              <h2>Rólunk</h2>
            </div>
        </a>
        <a href="../html/map.html">
            <div class="sidebar-item">
              <img class="sidebar-icon" src="../assets/map.png" alt="" />
              <h2>Térkép</h2>
            </div>
        </a>
        <a href="../html/contact.html">
            <div class="sidebar-item">
              <img class="sidebar-icon" src="../assets/contact.png" alt="" />
              <h2>Kapcsolat</h2>
            </div>
            </div>
        </a>
      <div class="sidebar-bottom">
        <img id="sidebar-setting" src="../assets/settings.png" alt="" />
      </div>
    </section>`;
    
}