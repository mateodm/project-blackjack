function changeBackground() {
    let background = document.getElementById("background")
    if (background.classList.contains("body")) {
        background.classList.remove("body")
        background.classList.add("body-2")
    }
    else if(background.classList.contains("body-2")) {
        background.classList.remove("body-2")
        background.classList.add("body-3")
    }
    else if(background.classList.contains("body-3")) {
        background.classList.remove("body-3")
        background.classList.add("body")
    }
}

setInterval(changeBackground, 10000);