const Data = [];

const Name = document.getElementById("Name");
const Email = document.getElementById("Email");
const Password = document.getElementById("Password");
const Password_again = document.getElementById("Password_again");
const Mobile = document.getElementById("Mobile");
const CompanyName = document.getElementById("CompanyName");
const Adomszam = document.getElementById("Adoszam");
const types = document.getElementById('Type_ceges');
document.getElementById('con_submit').textContent = "Regisztráció";
document.getElementById('Ceges').checked = true;
document.getElementById('con_submit').disabled = true;

const loginBTN = document.getElementsByClassName('login-buttons');
const Box = document.getElementById('Box');
Box.style.display = "none"

function Login(){
    document.getElementById('con_submit').textContent = "Belépés";
    document.getElementById('log').classList.add('active');
    document.getElementById('reg').classList.remove('active');
    Mobile.style.display = "none";
    CompanyName.style.display = "none";
    Adomszam.style.display = "none";
    types.style.display = "none";
    Password_again.style.display = "none";
}

function Registration(){
    document.getElementById('reg').classList.add('active');
    document.getElementById('log').classList.remove('active');
    document.getElementById('con_submit').textContent = "Regisztráció";
    Mobile.style.display = "";
    CompanyName.style.display = "";
    Adomszam.style.display = "";
    types.style.display = "";
    Password_again.style.display = "";
}

function Eldontes(){
    if(document.getElementById('Ceges').checked == true){
        return "Ceges";
    }
    if(document.getElementById('egyeni').checked == true){
        return "Egyeni";
    }
}

function Types(){
    if(document.getElementById('Ceges').checked == true){
        CompanyName.style.display = "";
        Adomszam.style.display = "";
    }
    if(document.getElementById('egyeni').checked == true){
        CompanyName.style.display = "none";
        Adomszam.style.display = "none";
    }
};

function Submit(){
    if(document.getElementById('reg').classList.contains('active') && !document.getElementById('log').classList.contains('active')){
        const NewProfile = {
            Name: document.getElementById('con_name').value,
            Email: document.getElementById('con_email').value,
            Password: document.getElementById('con_Password').value,
            Mobile: document.getElementById('con_mobile').value,
            Profile: Eldontes()
        }

        Data.push(NewProfile);
        localStorage.setItem('Profiles',JSON.stringify(Data))
    }
    if(document.getElementById('log').classList.contains('active') && !document.getElementById('reg').classList.contains('active')){
        const fiokok = JSON.parse(localStorage.getItem('Profiles'));
        for(let keys of fiokok){
            if(keys.Name == document.getElementById('con_name').value && keys.Email == document.getElementById('con_email').value && keys.Password == document.getElementById('con_Password').value){
                sessionStorage.setItem("Login", "true");
                sessionStorage.setItem("Type",keys.Profile);
            }
        }
    }
};

document.addEventListener('input', function () {
    const con_name = document.getElementById('con_name');
    const con_email = document.getElementById('con_email');
    const con_mobile = document.getElementById('con_mobile');
    const con_Password = document.getElementById('con_Password');
    const con_Password_again = document.getElementById('con_Password_again')
    const con_comp_name = document.getElementById('con_comp_name');
    const adomszam = document.getElementById('adomszam');
    const submitBtn = document.getElementById('con_submit');

    if(submitBtn.innerHTML == "Regisztráció" && document.getElementById('Ceges').checked == true){
        submitBtn.disabled =
        !con_name.value ||
        !con_email.value ||
        !con_mobile.value ||
        !con_Password.value||
        !con_Password_again.value||
        !adomszam.value||
        !con_comp_name.value;
        sessionStorage.setItem("Register", "true");
    }
    if(submitBtn.innerHTML == "Regisztráció" && document.getElementById('egyeni').checked == true){
        submitBtn.disabled =
        !con_name.value ||
        !con_email.value ||
        !con_mobile.value ||
        !con_Password.value||
        !con_Password_again.value||
        sessionStorage.setItem("Register", "true");
    }
    if(submitBtn.innerHTML == "Belépés"){
        if(submitBtn.innerHTML == "Belépés"){
            submitBtn.disabled =
            !con_name.value ||
            !con_email.value ||
            !con_Password.value;
            sessionStorage.setItem("Login", "false");
        }
    }
});

document.getElementById('con_submit').addEventListener("click", () => {
    sessionStorage.setItem("fromRegister", "true");
});

window.addEventListener("load", () => {

    if (sessionStorage.getItem("fromRegister") !== "true") return;
    sessionStorage.removeItem("fromRegister");

    if (sessionStorage.getItem("Register") === "true") {
        Box.style.display = "";
        BoxH1.innerText = "Sikeres Regisztráció!";
        sessionStorage.removeItem("Register");
        sessionStorage.setItem("reged","true");

        setTimeout(() => {
            window.location.href = "./index.html";
        }, 2000);
    }

    else if (sessionStorage.getItem("Login") === "false") {
        Box.style.display = "";
        BoxH1.innerText = "Sikertelen Bejelentkezés!";
        sessionStorage.removeItem("Login");

        setTimeout(() => {
            window.location.href = "../html/login.html";
        }, 2000);
    }

    else if (sessionStorage.getItem("Login") === "true") {
        Box.style.display = "";
        BoxH1.innerText = "Sikeres Bejelentkezés!";
        localStorage.setItem('Load',true);

        setTimeout(() => {
            if (sessionStorage.getItem("Type") === "Egyeni") {
                window.location.href = "./index.html";
            } else {
                window.location.href = "./logged-in-index.html";
            }
        }, 2000);
    }
});


adomszam.addEventListener("input", (e) => {
    // Csak a számokat hagyjuk meg
    let value = adomszam.value.replace(/\D/g, ""); 
    let formatted = "";

    if (value.length > 0) {
        formatted = value.substring(0, 8);
        if (value.length > 8) {
            formatted += "-" + value.substring(8, 9);
        }
        if (value.length > 9) {
            formatted += "-" + value.substring(9, 11);
        }
    }

    adomszam.value = formatted;
});

const con_mobile = document.getElementById('con_mobile');

con_mobile.addEventListener("input", () => {
    let value = con_mobile.value.replace(/\D/g, ""); 
    con_mobile.value = value.substring(0, 11);
});