export default function Input(props) {
    const { type, id, placeholder, value, onChange, onKeyDown, className } = props

    return <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`border border-black rounded-md py-2 pl-2 ${className}`}
    />
}