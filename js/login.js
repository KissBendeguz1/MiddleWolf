const Data = [];

const Name = document.getElementById("Name");
const Email = document.getElementById("Email");
const Password = document.getElementById("Password");
const Mobile = document.getElementById("Mobile");
const CompanyName = document.getElementById("CompanyName");
const Adomszam = document.getElementById("Adoszam");
const Type_ceges = document.getElementById("Type_ceges");
const Type_egyeni = document.getElementById("Type_egyeni");
document.getElementById('con_submit').textContent = "Regisztráció";
document.getElementById('Ceges').checked = true;

function Login(){
    Mobile.style.display = "none";
    CompanyName.style.display = "none";
    Adomszam.style.display = "none";
    Type_ceges.style.display = "none";
    Type_egyeni.style.display = "none";
    document.getElementById('con_submit').textContent = "Belépés";
}

function Registration(){
    Mobile.style.display = "";
    CompanyName.style.display = "";
    Adomszam.style.display = "";
    Type_ceges.style.display = "";
    Type_egyeni.style.display = "";
    document.getElementById('con_submit').textContent = "Regisztráció";
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
    const NewProfile = {
        Name: document.getElementById('con_name').value,
        Email: document.getElementById('con_email').value,
        Password: document.getElementById('con_Password').value,
        Mobile: document.getElementById('con_mobile').value,
        Profile: Eldontes()
    }

    Data.push(NewProfile);
    localStorage.setItem('Profiles',JSON.stringify(Data))
};