const Data = [];

const Name = document.getElementById("Name");
const Email = document.getElementById("Email");
const Password = document.getElementById("Password");
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
}

function Registration(){
    document.getElementById('reg').classList.add('active');
    document.getElementById('log').classList.remove('active');
    document.getElementById('con_submit').textContent = "Regisztráció";
    Mobile.style.display = "";
    CompanyName.style.display = "";
    Adomszam.style.display = "";
    types.style.display = "";
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
            }
        }
    }
};

document.addEventListener('input', function () {
    const con_name = document.getElementById('con_name');
    const con_email = document.getElementById('con_email');
    const con_mobile = document.getElementById('con_mobile');
    const con_Password = document.getElementById('con_Password');
    const submitBtn = document.getElementById('con_submit');

    if(submitBtn.innerHTML == "Regisztráció"){
        submitBtn.disabled =
        !con_name.value ||
        !con_email.value ||
        !con_mobile.value ||
        !con_Password.value;
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
    if (sessionStorage.getItem("fromRegister") === "true") {
        sessionStorage.removeItem("fromRegister");
        if(sessionStorage.getItem("Register") === "true"){
            Box.style.display = "";
            BoxH1.innerText = `Sikeres Regisztráció!`;
            setTimeout(() => {
                window.location.href = "./index.html";
            }, 2000);
        }
        if(sessionStorage.getItem("Login") === "false"){
            Box.style.display = "";
            BoxH1.innerText = `Sikertelen Bejelentkezés!`;
            setTimeout(() => {
                window.location.href = "./login.html";
            }, 2000);
        }
        if(sessionStorage.getItem("Login") === "true"){
            Box.style.display = "";
            BoxH1.innerText = `Sikeres Bejelentkezés!`;
            setTimeout(() => {
                window.location.href = "./index.html";
            }, 2000);
        }
    }
});