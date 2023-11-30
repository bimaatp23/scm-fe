import Swal from "sweetalert2"

export function setNotification(props) {
    const { icon, message } = props
    Swal.fire({
        title: message,
        icon: icon,
        showConfirmButton: false,
        timer: 3000
    })
}

export function setConfirm(props) {
    const { message, next } = props
    Swal.fire({
        title: message,
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "rgb(2, 132, 199)",
        denyButtonText: "No",
        denyButtonColor: "gray",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            next()
        }
    })
}

export function toRupiah(number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number).slice(0, -3)
}