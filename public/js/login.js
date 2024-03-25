
function login(event) {
    event.preventDefault();
    const email = document.getElementById("lemail").value
    const password = document.getElementById("lpassword").value
    let logindata = { email: email, password: password }
    showLoading()
    fetch("api/signin", {
        method: "POST", headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(logindata)
    },)
        .then(response => response.json()).then(response => {
            hideLoading();
            if (response.success === true) {
                Swal.fire({
                    position: "top-end",
                    width: "25em",
                    heigth: "4em",
                    imageWidth: "2em",
                    title: '<div><img src="./imagenes/checked.png" class="success-icon" alt="Success Icon"> Iniciaste sesión con éxito</div>',
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
                window.location.href = '/';
            }
                else {
                    Swal.fire({
                        position: "top-end",
                        width: "24em",
                        heigth: "4em",
                        imageWidth: "2em",
                        title: `<div><img src="./imagenes/exclamation.png" class="success-icon" alt="Success Icon"> ${response.message}</div>`,
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
        .catch(error => {
            console.error("Error en la solicitud:", error)
            hideLoading()
        })
}
