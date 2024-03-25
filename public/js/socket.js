let socket;

function activeSocket() {
    socket = io("http://localhost:8080");
    socket.on("connect", () => {
        socket.emit("start-game")
        socket.emit("puntuationTotal")
        setTimeout(reverseCard, 2700)
    });
    socket.on("petitionPCards", data => {
        let container = document.getElementById("playerCards");
        let html = '';
        let delay = 1.5
        html += `
                <img class="cards-bj-img" 
                    src="${data.img}" 
                    style="animation-delay: ${delay}s">
                </img>`;
        container.innerHTML += html;
        socket.emit("puntuationTotal")
    });
    socket.on("petitionDCards", (data, round) => {
        let container = document.getElementById("dealerCards");
        let html = '';
        let delay = 2
        html = `
                <img class="cards-bj-img" 
                    src="${data.img}" 
                    style="animation-delay: ${delay}s">
                </img>`;
        container.innerHTML += html;
        socket.emit("puntuationTotal")
    });

    socket.on("puntuationDOM", (playerScore, dealerScore, round) => {
        let pScore = document.getElementById("puntuationPlayer").innerHTML = `Puntuacion del jugador: ${playerScore}`
        let dScore = document.getElementById("puntuationDealer").innerHTML = `Puntuacion del dealer: ${dealerScore}`
        let roundDOM = document.getElementById("round").innerHTML = `Tu apuesta es de: ${round}`
        return
    })
    socket.on("result", (checkResult) => {
        console.log(checkResult)
        if (checkResult.whoLose === "dealer") {
            Swal.fire({
                title: `Has ganado por ${checkResult.as}`,
                text: `Tu puntuación: ${checkResult.puntuationP}, Puntuación dealer: ${checkResult.puntuationD}` ,
                timer: 5000,
                showConfirmButton: false,
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                customClass: {
                    popup: 'custom-swal-background',
                    title: 'custom-swal-text-color custom-swal-text-size',
                    text: 'custom-swal-text-color custom-swal-text-size',
                    htmlContainer: 'custom-swal-text-color custom-swal-text-size',
                    confirmButton: 'custom-swal-text-success custom-swal-text-size',
                }
              });
        }
        else if (checkResult.whoLose === "draw") {
            Swal.fire({
                title: `Has empatado por puntuación`,
                text: `Tu puntuación: ${checkResult.puntuationP}, Puntuación dealer: ${checkResult.puntuationD}` ,
                timer: 5000,
                showConfirmButton: false,
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                customClass: {
                    popup: 'custom-swal-background',
                    title: 'custom-swal-text-color custom-swal-text-size',
                    text: 'custom-swal-text-color custom-swal-text-size',
                    htmlContainer: 'custom-swal-text-color custom-swal-text-size',
                    confirmButton: 'custom-swal-text-success custom-swal-text-size',
                }
              });
        }
        else if(checkResult.whoLose === "player"){
            Swal.fire({
                title: `Has perdido por ${checkResult.as}`,
                text: `Tu puntuación: ${checkResult.puntuationP} Puntuación dealer: ${checkResult.puntuationD}` ,
                timer: 5000,
                showConfirmButton: false,
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                customClass: {
                    popup: 'custom-swal-background',
                    title: 'custom-swal-text-color custom-swal-text-size',
                    text: 'custom-swal-text-color custom-swal-text-size',
                    htmlContainer: 'custom-swal-text-color custom-swal-text-size',
                    confirmButton: 'custom-swal-text-success custom-swal-text-size',
                }
              });
        }
        setTimeout(redirectToBet, 4000)
    })
}


function reverseCard() {
    let container = document.getElementById("dealerCards")
    let html = `
    <img class="cards-bj-img reverse-card-dealer" 
        src="../cartas bj/reverse card.png">
    </img>`;
    container.innerHTML += html;
}
function optionsBJ() {
    let container = document.getElementById("options-bj").innerHTML =
        `
        <button onclick="orderCard()" class="order-button">Pedir más</button>       
        <button onclick="stay()" class="stay-button">Plantarse</button>
        <button class="surrender-button">Rendirse</button>
        `
}
function hideOptionsBJ() {
    let container = document.getElementById("options-bj");
    if (container) {
        container.innerHTML = "";
        setTimeout(optionsBJ, 4000);
    }
}
function flipCard() {
    let toFlip = document.getElementsByClassName("reverse-card-dealer");
    while (toFlip.length > 0) {
        toFlip[0].parentNode.removeChild(toFlip[0]);
        return
    }
}
function redirectToBet() {
    window.location.href = "/blackjack"
}
setTimeout(optionsBJ, 2800)

function orderCard() {
    hideOptionsBJ()
    socket.emit("ordered-card")
}
function stay() {
    hideOptionsBJ()
    flipCard()
    socket.emit("stay")

}