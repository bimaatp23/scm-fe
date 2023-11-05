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