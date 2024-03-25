function register(event) {
    event.preventDefault()
    showLoading()
    const email = document.getElementById("remail").value
    const username = document.getElementById("rusername").value
    const age = document.getElementById("rage").value
    const password = document.getElementById("rpassword").value
    const userData = {
        username: username,
        email: email,
        age: age,
        password: password,
    }
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(response => { 
        hideLoading()
        if (response.success === true) {
            Swal.fire({
                position: "top-end",
                width: "25em",
                heigth: "4em",
                imageWidth: "2em",
                title: '<div><img src="./imagenes/checked.png" class="success-icon" alt="Success Icon">Te registraste con éxito</div>',
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
            window.location.href = '/login';
        } else {
            Swal.fire({
                position: "top-end",
                width: "24em",
                heigth: "4em",
                imageWidth: "2em",
                title: `<div><img src="./imagenes/exclamation.png" class="success-icon" alt="Error Icon"> ${response.message}</div>`,
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
        console.error('Error en la solicitud:', error);
    });
    
}