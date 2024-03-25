function logout() {
    showLoading()
    fetch("/api/logout", {
        method: "POST", headers: {
            'Content-Type': 'application/json'
        }
    },)
        .then(response => response.json())
        .then(response => {
            hideLoading()
            Swal.fire({
                position: "top-end",
                width: "25em",
                heigth: "4em",
                imageWidth: "2em",
                title: '<div><img src="./imagenes/checked.png" class="success-icon" alt="Success Icon">Cerraste sesión con éxito</div>',
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
        })
}