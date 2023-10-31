import { useEffect } from "react"
import { UseCaseFactory } from "./UseCaseFactory"

export function Middleware(props) {
    const { isLogin, children } = props
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.current().get()

    useEffect(() => {
        if (isLogin) {
            if (currentSession.name == null) window.location.assign("/login")
        } else {
            if (currentSession.name != null) window.location.assign("/")
        }
    }, ["static"])

    return children
}