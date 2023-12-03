export default function Button(props) {
    const { children, onClick, color, size, className } = props

    let classSize = ""
    if (size === "sm") {
        classSize = "text-sm py-1 px-2"
    } else if (size === "md") {
        classSize = "text-md py-2 px-4"
    } else if (size === "lg") {
        classSize = "text-xl py-3 px-6"
    }

    let classColor = ""
    if (color === "red") {
        classColor = "bg-red-500 hover:bg-red-400"
    } else if (color === "green") {
        classColor = "bg-green-600 hover:bg-green-500"
    } else if (color === "blue") {
        classColor = "bg-blue-600 hover:bg-blue-500"
    } else if (color === "yellow") {
        classColor = "bg-amber-400 hover:bg-amber-300"
    } else if (color === "gray") {
        classColor = "bg-gray-400 hover:bg-gray-300"
    }

    return <button
        className={`rounded-md font-bold text-white ${classSize} ${classColor} ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
}