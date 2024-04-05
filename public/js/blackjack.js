
function bjBackground() {
    let background = document.getElementById("background")
    if(window.location.href.includes("/blackjack")) {
        background.classList.remove("body")
        background.classList.add("bj-background")
    }
}





bjBackground()