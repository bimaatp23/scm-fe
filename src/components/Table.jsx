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
    const { children } = props

    return <tbody>
        <tr>
            {children}
        </tr>
    </tbody>
}

export function TableCell(props) {
    const { children } = props

    return <td className="border-2 py-2 px-6 border-slate-300">
        {children}
    </td>
}