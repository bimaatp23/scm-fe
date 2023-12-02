export default function TitlePage(props) {
    const { children } = props
    return <h1 className="text-left text-4xl font-bold text-blue-600 mb-4">
        {children}
    </h1>
}