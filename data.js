var usersData = 0
const User_con = document.getElementById('user-count');
const asd = document.getElementById('asd');


async function fetchUsers() {
    const response = await fetch('http://localhost:3001/getusers');
    
    if (!response.ok) {
        throw new Error(`HTTP hiba! Státusz: ${response.status}`);
    }

    usersData = await response.json();
    
    console.log("Sikeresen lekérdezett adatok:");
    console.log(usersData);
    
    return usersData;
}

fetchUsers()
    .then(users => {
        User_con.textContent = `Összes felhasználó: ${users.length}`;
    })
    .catch(error => {
        console.error("Hiba történt az adatlekérés során:", error);
    });


for(let User of Object(usersData)){
    console.log(User["Name"])
}