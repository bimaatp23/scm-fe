import { useEffect } from "react"
import { UseCaseFactory } from "./UseCaseFactory"
import ClientWrapper from "./components/ClientWrapper"

export function Middleware(props) {
    const { isLogin, children } = props
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()

    useEffect(() => {
        if (isLogin) {
            if (currentSession.name == null) window.location.assign("/login")
        } else {
            if (currentSession.name != null) window.location.assign("/")
        }
    }, ["static"])

    return isLogin ? <ClientWrapper>{children}</ClientWrapper> : children
}