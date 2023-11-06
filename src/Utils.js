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

export function toRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number).slice(0, -3)
}