let socket;

function activeSocket(bet) {
    socket = io();
    socket.on("connect", () => {
        socket.emit("start-game", bet)
        socket.emit("puntuationTotal")
        setTimeout(reverseCard, 2700)
    });
    socket.on("petitionPCards", data => {
        cardSound.play()
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
    socket.on("options", data => {
        let opacity = document.getElementById("opacity")
        let options = document.getElementById("options")
        opacity.classList.add("bj-opacity")
        options.classList.remove("d-none")
    })
    socket.on("petitionDCards", (data, round) => {
        cardSound.play()
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
    socket.on("flipCard", () => {
      let toFlip = document.getElementsByClassName("reverse-card-dealer");
      while (toFlip.length > 0) {
          toFlip[0].parentNode.removeChild(toFlip[0]);
          return
      }
    })
    socket.on("puntuationDOM", (playerScore, dealerScore, round) => {
        let pScore = document.getElementById("puntuationPlayer").innerHTML = `Puntuacion del jugador: ${playerScore}`
        let dScore = document.getElementById("puntuationDealer").innerHTML = `Puntuacion del dealer: ${dealerScore}`
        return
    })
    socket.on("result", (checkResult) => {
        if (checkResult.whoLose === "dealer") {
            winSound.play()
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
            loseSound.play()
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
        socket.emit("finish-game", checkResult)
        setTimeout(redirectToBet, 4000)
    })
}

