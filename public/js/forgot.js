
function forgotPassword(event) {
    event.preventDefault()
    const email = { email: document.getElementById("femail").value }
    fetch("api/forgot-password", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email),
    })
        .then(response => response.json())
        .then(response => {
            if (response.success === true) {
                Swal.fire({
                    position: "top-end",
                    width: "25em",
                    heigth: "4em",
                    imageWidth: "2em",
                    title: '<div><img src="./imagenes/checked.png" class="success-icon" alt="Success Icon"> Revisa tu correo</div>',
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
            }
            else {
                Swal.fire({
                    position: "top-end",
                    width: "24em",
                    heigth: "4em",
                    imageWidth: "2em",
                    title: `<div><img src="./imagenes/exclamation.png" class="success-icon" alt="Error Icon"> Ha ocurrido un error</div>`,
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
            }
        })
}