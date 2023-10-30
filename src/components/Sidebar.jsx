const Sidebar = () => {
    return(
        <div className="flex flex-col justify-between text-left bg-sky-700 h-screen fixed top-0 bottom-0 left-0 col-span-1 text-white py-6 pl-6">
            <div>
                <div className="mt-2 mb-16">
                    <h1 className="text-3xl font-bold">SCM</h1>
                </div>
                <div className="mt-8 text-xl font-semibold">
                    <div className="mb-2">
                        <div></div>
                        <h1>Dashboard</h1>
                    </div>
                    <div className="mb-2">
                        <div></div>
                        <h1>Produk</h1>
                    </div>
                    <div className="mb-2">
                        <div></div>
                        <h1>Produk</h1>
                    </div>
                    <div className="mb-2">
                        <div></div>
                        <h1>Produk</h1>
                    </div>
                    <div className="mb-2">
                        <div></div>
                        <h1>Produk</h1>
                    </div>
                </div>
            </div>
            <div className="text-xl font-semibold">
                <div>Setting</div>
                <div>Log out</div>
            </div>
        </div>
    )
}

export default Sidebar