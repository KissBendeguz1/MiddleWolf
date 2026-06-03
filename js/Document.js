const Box = document.getElementById('Box');
Box.style.display = "none";

const file_upload = document.getElementById('file_upload');
const File_name_label = document.getElementById('File_name_label');
const File_name = document.getElementById('File_name');
const file_text = document.getElementById('file_text');
const file_text_label = document.getElementById('file_text_label');

const upload = document.getElementById('upload').checked = true;
const write = document.getElementById('write');

document.getElementById('docs-top-button').addEventListener('click', () =>{
    const BoxContent = document.getElementById('Box-content-id');
    Box.style.display = "";
})

function File_type(){
    if(document.getElementById('upload').checked == true){
        file_upload.style.display = "";
        File_name_label.style.display = "none";
        File_name.style.display = "none";
        file_text.style.display = "none";
        file_text_label.style.display = "none";
    }
    if(document.getElementById('write').checked == true){
        file_upload.style.display = "none";
        File_name_label.style.display = "";
        File_name.style.display = "";
        file_text.style.display = "";
        file_text_label.style.display = "";
    }
}

function Close(){
    Box.style.display = "none";
}

/*
function Send() {
    const container = document.getElementById('docs-list-container');
    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

    if (document.getElementById('upload').checked == true) {
        ShowAlert('Fájlfeltöltés funkció folyamatban...', 'alert');
    } 
    
    if (document.getElementById('write').checked == true) {
        const nameValue = File_name.value || "Névtelen dokumentum";
        
        const ember = JSON.parse(localStorage.getItem('Profiles'))
        let nev = "";

        for(let i in ember){
            nev = ember[i].Name;
        }
            
        const fileHTML = `            
        <div class="docs-item">
            <div class="docs-item-inner">
                <img src="../assets/docs-icon.svg" alt="" />
                <div class="docs-item-text">
                    <h2>${nameValue}</h2>
                    <p>Megosztva: ${nev} - <span class="doc-date">${formattedDate}</span></p>
                </div>
            </div>
            <div class="docs-item-buttons">
                <button class="docs-item-button">Megnyitás</button>
                <button onclick="ShowAlert('Még nem elkészült funkció', 'alert')" class="docs-item-button">Szerkesztés</button>
            </div>
        </div>`;

        const parser = new DOMParser();
        const doc = parser.parseFromString(fileHTML, 'text/html');
        const newElement = doc.body.firstChild;

        container.appendChild(newElement);

        File_name.value = "";
        file_text.value = "";
        Close();
    }
}*/
