import moment from "moment/moment"
import React, { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import Sidebar from "./Sidebar"

export default function ClientWrapper(props) {
    const useCaseFactory = new UseCaseFactory()
    const { children } = props
    const [currentTime, setCurrentTime] = useState(useCaseFactory.currentTime().get())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(useCaseFactory.currentTime().get())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return <div>
        <div className="fixed h-[100vh  ] w-[20vw] left-0">
            <Sidebar />
        </div>
        <div className="bg-white fixed h-[100vh] w-[80vw] right-0 overflow-y-scroll">
            <div className="relative">
                <div className="col-span-5 w-full p-8">
                    {children}
                </div>
            </div>
        </div>
        <p className="fixed right-4 bottom-2">{moment(currentTime).format("YYYY-MM-DD HH:mm:ss")}</p>
    </div>
}