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

const Data = [];

const Password_again = document.getElementById("Password_again");
const Mobile = document.getElementById("Mobile");
const Name = document.getElementById("Name");
const title = document.getElementById("title");
const submitBtn = document.getElementById("con_submit");
submitBtn.innerHTML = "Regisztráció";

const con_name = document.getElementById("con_name");
const con_email = document.getElementById("con_email");
const con_mobile = document.getElementById("con_mobile");
const con_Password = document.getElementById("con_Password");
const con_Password_again = document.getElementById("con_Password_again");
const profile_type = document.getElementById("profile_type");

function Login() {
  title.innerHTML = "Bejelentkezés";
  Name.style.display = "none";
  Password_again.style.display = "none";
  Mobile.style.display = "none";
  con_email.placeholder = "Név/Email";
  document.getElementById("reg").classList.remove("active");
  document.getElementById("log").classList.add("active");
  document.getElementById("Profile_type").style.display = "none";
  document.querySelector('.password-strength').style.display = "none";
  submitBtn.innerHTML = "Belépés";
}

function Registration() {
  title.innerHTML = "Regisztráció";
  Name.style.display = "";
  Password_again.style.display = "";
  Mobile.style.display = "";
  con_email.placeholder = "Email";
  document.getElementById("log").classList.remove("active");
  document.getElementById("reg").classList.add("active");
  document.getElementById("Profile_type").style.display = "";
  document.querySelector('.password-strength').style.display = "";
  submitBtn.innerHTML = "Regisztráció";
}
let allFilled = "";
let loginFilled = "";

function validate() {
  const mode = submitBtn.innerHTML.trim();

  if (mode === "Regisztráció") {
    allFilled =
      con_name.value.trim() !== "" &&
      con_email.value.trim() !== "" &&
      con_mobile.value.trim() !== "" &&
      con_Password.value.trim() !== "" &&
      con_Password_again.value.trim() !== "" &&
      profile_type.value.trim() !== "";

    const passwordsMatch = con_Password.value === con_Password_again.value;

    submitBtn.disabled = !(allFilled && passwordsMatch);
  } else if (mode === "Belépés") {
    loginFilled =
      con_email.value.trim() !== "" && con_Password.value.trim() !== "";

    submitBtn.disabled = !loginFilled;
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validate();
  const userData = {
    username: con_name.value,
    email: con_email.value,
    mobile: con_mobile.value,
    password: con_Password.value,
    type: profile_type.value,
  };

  if (submitBtn.innerHTML.trim() === "Regisztráció") {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", `${API_BASE_URL}/createUser`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          sessionStorage.setItem("Register", "true");
          ShowAlert("Sikeres regisztráció!", "success");
        } else {
          if (!allFilled) {
            ShowAlert("Valamelyik mező üresen maradt!", "alert");
          } else {
            ShowAlert("Hibás Név, Email vagy jelszó!", "alert");
          }
        }
      }
    };

    xhr.send(JSON.stringify(userData));
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}/login`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          sessionStorage.setItem("Login", "true");
          const User = parseInt(JSON.parse(xhr.responseText).user.ID);
          localStorage.setItem("Profile", User);
          sessionStorage.setItem("SelectedCompany", "");
          window.location.href = "../html/index.html";
          console.log(User);
        } else if (xhr.status === 401) {
          if (!loginFilled) {
            ShowAlert("Valamelyik mező üresen maradt!", "alert");
          } else {
            ShowAlert("Hibás Név, Email vagy jelszó!", "alert");
          }
        } else {
          alert("Szerver hiba történt: " + xhr.status);
        }
      }
    };

    xhr.send(
      JSON.stringify({
        username: con_name.value,
        email: con_email.value,
        password: con_Password.value,
      }),
    );
  }
});

// Password strength meter
function checkPasswordStrength(password) {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  if (checks.length) score++;
  if (checks.lower) score++;
  if (checks.upper) score++;
  if (checks.number) score++;
  if (checks.special) score++;

  return score;
}

function updatePasswordStrength() {
  const password = con_Password.value;
  const strengthDiv = document.querySelector('.password-strength');
  const strengthBar = strengthDiv.querySelector('.strength-bar');
  const strengthText = strengthDiv.querySelector('.strength-text');

  const score = checkPasswordStrength(password);

  strengthDiv.className = 'password-strength';

  if (score === 0) {
    strengthText.textContent = '';
  } else if (score <= 2) {
    strengthDiv.classList.add('weak');
    strengthText.textContent = 'Gyenge';
  } else if (score === 3) {
    strengthDiv.classList.add('medium');
    strengthText.textContent = 'Közepes';
  } else if (score === 4) {
    strengthDiv.classList.add('strong');
    strengthText.textContent = 'Erős';
  } else {
    strengthDiv.classList.add('very-strong');
    strengthText.textContent = 'Nagyon erős';
  }
}

// Add event listener to password input
con_Password.addEventListener('input', updatePasswordStrength);

// Password visibility toggle
function togglePasswordVisibility(targetId) {
  const input = document.getElementById(targetId);
  const toggle = document.querySelector(`[data-target="${targetId}"]`);
  
  if (input.type === 'password') {
    input.type = 'text';
    toggle.textContent = '🤐';
    toggle.title = 'Jelszó elrejtése';
  } else {
    input.type = 'password';
    toggle.textContent = '👁️';
    toggle.title = 'Jelszó megjelenítése';
  }
}

// Add event listeners to password toggles
document.querySelectorAll('.password-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.getAttribute('data-target');
    togglePasswordVisibility(targetId);
  });
});
