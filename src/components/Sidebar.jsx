import { Dashboard, Factory, FormatListBulleted, Group, Inventory, LockReset, Logout, ShoppingCart, Warehouse } from "@mui/icons-material"
import BasicConstant from "../BasicConstant"
import { UseCaseFactory } from "../UseCaseFactory"

export default function Sidebar(props) {
    const { openModalChangePassword, doLogout } = props
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()

    return (
        <div className="flex flex-col justify-between text-left bg-blue-700 h-screen fixed w-full top-0 bottom-0 left-0 col-span-1 text-white pt-6">
            <div>
                <div className="mt-2 mb-6 pl-6">
                    <h1 className="text-3xl font-bold cursor-pointer" onClick={props.setStaticOpen}>{props.minimize ? <FormatListBulleted /> : "eSCM PT Rajawali"}</h1>
                </div>
                <ul>
                    <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/" name="Dashboard"><Dashboard /></ItemLink>
                    {currentSession.role === BasicConstant.ROLE_ADMIN ?
                        <>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/user-list" name="User List"><Group /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/inventory-list" name="Inventory List"><Warehouse /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/production-list" name="Production List"><Factory /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/production-history" name="Production History"><Factory /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/order-list" name="Order List"><ShoppingCart /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/order-history" name="Order History"><ShoppingCart /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/procurement-list" name="Procurement List"><Inventory /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/procurement-history" name="Procurement History"><Inventory /></ItemLink>
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_PENGADAAN ?
                        <>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/procurement-list" name="Procurement List"><Inventory /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/procurement-history" name="Procurement History"><Inventory /></ItemLink>
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_GUDANG ?
                        <>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/inventory-list" name="Inventory List"><Warehouse /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/production-list" name="Production List"><Factory /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/production-history" name="Production History"><Factory /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/procurement-history" name="Procurement History"><Inventory /></ItemLink>
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_PRODUKSI ?
                        <>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/production-list" name="Production List"><Factory /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/production-history" name="Production History"><Factory /></ItemLink>
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_DISTRIBUSI ?
                        <>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/inventory-list" name="Inventory List"><Warehouse /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/order-list" name="Order List"><ShoppingCart /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/order-history" name="Order History"><ShoppingCart /></ItemLink>
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_RETAIL ?
                        <>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/order-list" name="My Order"><ShoppingCart /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/order-history" name="My Order History"><ShoppingCart /></ItemLink>
                        </>
                        : <></>
                    }
                    {currentSession.role === BasicConstant.ROLE_SUPPLIER ?
                        <>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/procurement-list" name="Procurement List"><Inventory /></ItemLink>
                            <ItemLink setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} path="/procurement-history" name="Procurement History"><Inventory /></ItemLink>
                        </>
                        : <></>
                    }
                </ul>
            </div>
            <div>
                <ul>
                    <ItemFunction setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} onClick={openModalChangePassword} name="Change Password"><LockReset /></ItemFunction>
                    <ItemFunction setDinamicOpen={props.setDinamicOpen} setDinamicClose={props.setDinamicClose} minimize={props.minimize} onClick={doLogout} name="Log out"><Logout /></ItemFunction>
                </ul>
            </div>
        </div>
    )
}

function ItemLink(props) {
    const { setDinamicOpen, setDinamicClose, minimize, path, name, children } = props

    return <li
        onClick={() => window.location.assign(path)}
        className="text-xl font-semibold hover:bg-gray-900 hover:text-blue-600 pl-6 py-2 cursor-pointer"
        onMouseOver={setDinamicOpen}
        onMouseLeave={setDinamicClose}
    >
        {minimize ? children : name}
    </li>
}

function ItemFunction(props) {
    const { setDinamicOpen, setDinamicClose, minimize, onClick, name, children } = props

    return <li
        onClick={onClick}
        className="text-xl font-semibold hover:bg-gray-900 hover:text-blue-600 pl-6 py-2 cursor-pointer"
        onMouseOver={setDinamicOpen}
        onMouseLeave={setDinamicClose}
    >
        {minimize ? children : name}
    </li>
}