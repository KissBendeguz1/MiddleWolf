const Data = [];

const Password_again = document.getElementById("Password_again");
const Mobile = document.getElementById("Mobile");
const title = document.getElementById('title');
const submitBtn = document.getElementById('con_submit');
submitBtn.innerHTML = "Regisztráció";

const con_name = document.getElementById('con_name');
const con_email = document.getElementById('con_email');
const con_mobile = document.getElementById('con_mobile');
const con_Password = document.getElementById('con_Password');
const con_Password_again = document.getElementById('con_Password_again');
const profile_type = document.getElementById('profile_type');

function Login(){
    title.innerHTML = "Bejelentkezés";
    Password_again.style.display = "none";
    Mobile.style.display = "none";
    document.getElementById('reg').classList.remove('active');
    document.getElementById('log').classList.add('active');
    document.getElementById('Profile_type').style.display = "none";
    submitBtn.innerHTML = "Belépés";
}

function Registration(){
    title.innerHTML = "Regisztráció";
    Password_again.style.display = "";
    Mobile.style.display = "";
    document.getElementById('log').classList.remove('active');
    document.getElementById('reg').classList.add('active');
    document.getElementById('Profile_type').style.display = "";
    submitBtn.innerHTML = "Regisztráció";
}

function validate() {
    const mode = submitBtn.innerHTML.trim();

    if (mode === "Regisztráció") {
        const allFilled = con_name.value.trim() !== "" && 
                          con_email.value.trim() !== "" && 
                          con_mobile.value.trim() !== "" && 
                          con_Password.value.trim() !== "" && 
            con_Password_again.value.trim() !== "" && 
            profile_type.value.trim() !== "";

        const passwordsMatch = con_Password.value === con_Password_again.value;

        submitBtn.disabled = !(allFilled && passwordsMatch);

    } 
    else if (mode === "Belépés") {
        const loginFilled = con_email.value.trim() !== "" && 
                            con_Password.value.trim() !== "";
        
        submitBtn.disabled = !loginFilled;
    }
}

const inputs = [con_name, con_email, con_mobile, con_Password, con_Password_again];
inputs.forEach(input => {
    if(input) {
        input.addEventListener('input', validate);
    }
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userData = {
        "username": con_name.value,    
        "email": con_email.value,      
        "mobile": con_mobile.value,    
        "password": con_Password.value,
        "type": profile_type.value
    };

    if (submitBtn.innerHTML.trim() === "Regisztráció") {
        var xhr = new XMLHttpRequest();
        
        xhr.open("POST", "http://78.92.114.56:6969/api/createUser", true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    sessionStorage.setItem("Register", "true");
                    alert("Sikeres regisztráció!");
                } else {
                    console.error("Server error:", xhr.responseText);
                    alert("Hiba történt: " + xhr.status);
                }
            }
        };

        xhr.send(JSON.stringify(userData));

    } else {
    var nevVal = con_name.value;
    var emailVal = con_email.value;
    var passVal = con_Password.value;

    if (!nevVal ||!emailVal || !passVal) {
        alert("Kérlek töltsd ki mindkét mezőt!");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://78.92.114.56:6969/api/login", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { 
            if (xhr.status === 200 || xhr.status === 201) {
                sessionStorage.setItem('Login', "true");
                const User = parseInt(JSON.parse(xhr.responseText).user.ID);
                localStorage.setItem('Profile',User);
                window.location.href = "../html/index.html";
                console.log(User)
            } else if (xhr.status === 401) {
                alert(xhr.responseText);
            } else {
                alert("Szerver hiba történt: " + xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify({
        "username":con_name.value,
        "email": con_email.value,
        "password": con_Password.value
    }));
}
});

validate();
