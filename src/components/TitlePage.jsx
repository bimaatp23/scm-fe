export default function TitlePage(props) {
    const { children } = props
    return <h1 className="text-left text-4xl font-bold text-sky-700 mb-8">
        {children}
    </h1>
}