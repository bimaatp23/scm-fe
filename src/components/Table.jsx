export function Table(props) {
    const { children } = props

    return <table className="border-2 border-slate-300">
        {children}
    </table>
}

export function TableRowHead(props) {
    const { children } = props

    return <thead>
        <tr className="bg-slate-200 font-bold text-center">
            {children}
        </tr>
    </thead>
}

export function TableRow(props) {
    const { children, className } = props

    return <tbody>
        <tr className={className}>
            {children}
        </tr>
    </tbody>
}

export function TableCell(props) {
    const { children, colSpan, className } = props

    return <td colSpan={colSpan ?? 1} className={`border-2 py-2 px-2 border-slate-300 ${className}`}>
        {children}
    </td>
}