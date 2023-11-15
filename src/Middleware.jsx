import { useEffect, useState } from "react"
import { UseCaseFactory } from "./UseCaseFactory"
import ClientWrapper from "./components/ClientWrapper"

export function Middleware(props) {
    const { isLogin, children } = props
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()

    const [isStatic, setIsStatic] = useState(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            if (isLogin) {
                if (currentSession.name === null) window.location.assign("/login")
            } else {
                if (currentSession.name !== null) window.location.assign("/")
            }
        }
    }, [isStatic, currentSession, isLogin])

    return isLogin ? <ClientWrapper>{children}</ClientWrapper> : children
}