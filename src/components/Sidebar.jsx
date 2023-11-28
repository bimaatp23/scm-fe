import BasicConstant from "../BasicConstant"
import { UseCaseFactory } from "../UseCaseFactory"

export default function Sidebar(props) {
    const { openModalChangePassword, doLogout } = props
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()

    return (
        <div className="flex flex-col justify-between text-left bg-sky-700 h-screen fixed w-full top-0 bottom-0 left-0 col-span-1 text-white pt-6">
            <div>
                <div className="mt-2 mb-6 pl-6">
                    <h1 className="text-3xl font-bold">eSCM PT Rajawali</h1>
                </div>
                <ul>
                    <ItemLink path="/" name="Dashboard" />
                    {currentSession.role === BasicConstant.ROLE_ADMIN ?
                        <>
                            <ItemLink path="/user-list" name="User List" />
                            <ItemLink path="/inventory-list" name="Inventory List" />
                            <ItemLink path="/production-list" name="Production List" />
                            <ItemLink path="/production-history" name="Production History" />
                            <ItemLink path="/order-list" name="Order List" />
                            <ItemLink path="/order-history" name="Order History" />
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_GUDANG ?
                        <>
                            <ItemLink path="/inventory-list" name="Inventory List" />
                            <ItemLink path="/production-list" name="Production List" />
                            <ItemLink path="/production-history" name="Production History" />
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_PRODUKSI ?
                        <>
                            <ItemLink path="/production-list" name="Production List" />
                            <ItemLink path="/production-history" name="Production History" />
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_DISTRIBUSI ?
                        <>
                            <ItemLink path="/inventory-list" name="Inventory List" />
                            <ItemLink path="/order-list" name="Order List" />
                            <ItemLink path="/order-history" name="Order History" />
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_RETAIL ?
                        <>
                            <ItemLink path="/order-list" name="My Order" />
                            <ItemLink path="/order-history" name="My Order History" />
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_SUPPLIER ?
                        <>
                            <ItemLink path="/product-list" name="My Product" />
                        </>
                        : <></>
                    }
                </ul>
            </div>
            <div>
                <ul>
                    <ItemFunction onClick={openModalChangePassword} name="Change Password" />
                    <ItemFunction onClick={doLogout} name="Log out" />
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