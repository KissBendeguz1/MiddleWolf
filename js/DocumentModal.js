function Load() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://78.92.125.103:6969/api/createDocs",true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if(xhr.status === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                const datum = "";
                const d = new Date();
                const day = d.getDate();
                const month = d.getMonth();
                const year = d.getFullYear();
                datum = `${year}.${month}.${day}`;
            }
            else{
                console.error("Hiba:" + xhr.status);
            }
        }
    }
    xhr.send(JSON.stringify({
        "title": document.getElementById('recruitment-position-title').innerHTML,
        "content":document.getElementById('recruitment-position-content').innerHTML,
        "companyid":sessionStorage.getItem('SelectedCompany'),
        "types":document.getElementById('available-employees').value,
        "creationdate": datum,
        "employeeid":localStorage.getItem('Profile')
    }));
}


function openRecruitmentModal() {
  const modal = document.getElementById("recruitment-modal");
  if (modal) {
    modal.style.display = "flex";
    document.getElementById("recruitment-form").reset();
    loadAvailableEmployees();
  }
}

function closeRecruitmentModal() {
  const modal = document.getElementById("recruitment-modal");
  if (modal) {
    modal.style.display = "none";
    document.getElementById("recruitment-form").reset();
  }
}