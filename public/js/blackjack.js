
function bjBackground() {
    let background = document.getElementById("background")
    if(window.location.href.includes("http://localhost:8080/blackjack")) {
        background.classList.remove("body")
        background.classList.add("bj-background")
    }
}

function startGame() {
    
}



bjBackground()