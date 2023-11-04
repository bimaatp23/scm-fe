export function Select(props) {
    const { children, value, onChange, className } = props

    return <select
        className={`border border-black rounded-md py-2 pl-2 ${className}`}
        value={value}
        onChange={onChange}
    >
        {children}
    </select>
}

export function SelectOption(props) {
    const { children, value } = props

    return <option value={value}>
        {children}
    </option>
}