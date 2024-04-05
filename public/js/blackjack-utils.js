
function reverseCard() {
    cardSound.play()
    let container = document.getElementById("dealerCards")
    let html = `
    <img class="cards-bj-img reverse-card-dealer" 
        src="../cartas bj/reverse card.png">
    </img>`;
    container.innerHTML += html;
}
function hideOptionsBJ() {
    let options = document.getElementById("options").classList.add("d-none")
    let opacity = document.getElementById("opacity").classList.remove("bj-opacity")
    return
}

function redirectToBet() {
    window.location.href = "/blackjack"
}

function orderCard() {
    hideOptionsBJ()
    socket.emit("ordered-card")
}
function stay() {
    hideOptionsBJ()
    socket.emit("stay")
}

function double() {
    hideOptionsBJ()
    let double = document.getElementById("double")
    double.classList.add("d-none")
    socket.emit("double")
}