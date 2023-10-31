import { UseCaseFactory } from "../UseCaseFactory"

export default function Sidebar() {
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.current().get()

    const onLogout = () => {
        useCaseFactory.current().clear()
        window.location.assign("/login")
    }

    return (
        <div className="flex flex-col justify-between text-left bg-sky-700 h-screen fixed w-full top-0 bottom-0 left-0 col-span-1 text-white pt-6">
            <div>
                <div className="mt-2 mb-6 pl-6">
                    <h1 className="text-3xl font-bold">eSCM PT Rajawali</h1>
                </div>
                <ul>
                    <ItemLink path="/" name="Dashboard" />
                    {currentSession.role === 'admin' ?
                        <>
                            <ItemLink path="/user-list" name="User List" />
                        </>
                        : <></>
                    }
                </ul>
            </div>
            <div>
                <ul>
                    <ItemLink path="#" name="Setting" />
                    <ItemFunction onClick={onLogout} name="Log out" />
                </ul>
            </div>
        </div>
    )
}

function ItemLink(props) {
    const { path, name } = props

    return <li onClick={() => window.location.assign(path)} className="text-xl font-semibold hover:bg-sky-900 pl-6 py-2 cursor-pointer">{name}</li>
}

function ItemFunction(props) {
    const { onClick, name } = props

    return <li onClick={onClick} className="text-xl font-semibold hover:bg-sky-900 pl-6 py-2 cursor-pointer">{name}</li>
}