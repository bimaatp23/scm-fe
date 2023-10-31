import React from "react"
import Sidebar from "./Sidebar"

export default function ClientWrapper(props) {
    const { children } = props

    return <div>
        <div className="fixed h-[100vh] w-[20vw] left-0">
            <Sidebar />
        </div>
        <div className="bg-white fixed h-[100vh] w-[80vw] right-0 overflow-y-scroll">
            <div className="relative">
                <div className="col-span-5 w-full p-8">
                    {children}
                </div>
            </div>
        </div>
    </div>
}