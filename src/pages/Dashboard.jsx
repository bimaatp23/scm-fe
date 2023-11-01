import { UseCaseFactory } from "../UseCaseFactory"
import TitlePage from "../components/TitlePage"

export default function Dashboard() {
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()

    return <>
        <TitlePage>Dashboard</TitlePage>
        <div className="grid gap-4">
            <div className="bg-sky-100 h-40 w-1/2 rounded-2xl">
                <p>Name : {currentSession.name}</p>
                <p>Username : {currentSession.username}</p>
                <p>Role : {currentSession.role}</p>
            </div>
        </div>
    </>
}