function getFreeCoins(email) {
    let mail = {email: email}
    fetch("api/get-coins", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mail),
    })
    Swal.fire({
        position: "top-end",
        width: "25em",
        heigth: "4em",
        imageWidth: "2em",
        title: '<div><img src="./imagenes/checked.png" class="success-icon" alt="Success Icon">Recibiste 100 fichas con éxito</div>',
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
    setTimeout(window.location.reload(), 3500)
}