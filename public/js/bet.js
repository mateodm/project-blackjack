function totalBet(bet, balance) {
    let totalAmount = document.getElementById("totalBet").innerText;
    let addChips = document.getElementById("addChips")
    let number = parseInt(totalAmount)
    let docToModify = document.getElementById("totalBet")
    if (bet === 50 || bet === 100 || bet === 500 || bet === 1000 || bet === 5000) {
        let newAmount = number + bet
        if (balance >= newAmount) {
            if (bet === 50) {
                addChips.innerHTML += `<img class="bj-chip-bet" src="/imagenes/ficha50a.png">`
            }
            else if (bet === 100) {
                addChips.innerHTML += `<img class="bj-chip-bet" src="/imagenes/ficha100.png">`
            }
            else if (bet === 500) {
                addChips.innerHTML += `<img class="bj-chip-bet" src="/imagenes/ficha500.png">`
            }
            else if (bet === 1000) {
                addChips.innerHTML += `<img class="bj-chip-bet" src="/imagenes/ficha1000.png">`
            }
            else if (bet === 5000) {
                addChips.innerHTML += `<img class="bj-chip-bet" src="/imagenes/ficha5000.png">`
            }
                docToModify.innerText = newAmount
            return
        }
        else {
            Swal.fire({
                position: "top-end",
                width: "24em",
                heigth: "4em",
                imageWidth: "2em",
                title: `<div><img src="./imagenes/exclamation.png" class="success-icon" alt="Error Icon">Saldo insuficiente</div>`,
                icon: null,
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    popup: 'custom-swal-background',
                    title: 'custom-swal-text-color custom-swal-text-size',
                    htmlContainer: 'custom-swal-text-color custom-swal-text-size',
                    confirmButton: 'custom-swal-text-color custom-swal-text-size',
                }
            })
            return
        }
    }
    else {
        return
    }
}
function resetBet() {
    let resetBet = document.getElementById("totalBet")
    let removeChips = document.getElementById("addChips")
    removeChips.innerHTML = ""
    resetBet.innerText = 0
}

function startGame() {
    let totalAmount = document.getElementById("totalBet").innerText;
    let number = parseInt(totalAmount)
    showLoading()
    if (number > 49) {
        hideLoading(400)
        let howBet = document.getElementById("howbet")
        let arenad = document.getElementById("arena-bj-d")
        let arenap = document.getElementById("arena-bj-p")
        let removeBet = document.getElementById("arena-bet")
        arenad.classList.remove("d-none")
        arenap.classList.remove("d-none")
        removeBet.classList.add("d-none")
        howBet.innerHTML = `Tu apuesta es de ${totalAmount}`
        activeSocket()
        return
    }
    else {
        hideLoading()
        return
    }
}