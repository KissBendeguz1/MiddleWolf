function ShowAlert(message, type) {
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