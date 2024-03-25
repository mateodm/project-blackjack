function resetPass(event) {
    event.preventDefault()
    let newPassword = {password: document.getElementById("frpassword").value}
    if(newPassword.password.length <= 20) {
        fetch("/api/reset-password", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPassword)
        })
        .then(response => response.json())
        .then(response => {
            if(response.success === true) {
                Swal.fire({
                    position: "top-end",
                    width: "25em",
                    heigth: "4em",
                    imageWidth: "2em",
                    title: '<div><img src="../imagenes/checked.png" class="success-icon" alt="Success Icon">Contraseña cambiada éxitosamente</div>',
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
    else {
        Swal.fire({
            position: "top-end",
            width: "24em",
            heigth: "4em",
            imageWidth: "2em",
            title: `<div><img src="./imagenes/exclamation.png" class="success-icon" alt="Error Icon"> La contraseña tiene un máximo de 20 caracteres</div>`,
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
    }
