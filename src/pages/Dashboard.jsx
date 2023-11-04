import { UseCaseFactory } from "../UseCaseFactory"
import TitlePage from "../components/TitlePage"

export default function Dashboard() {
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()

    return (
        <div>
            <TitlePage>Dashboard</TitlePage>
            <div className="w-80 bg-sky-100 rounded-2xl py-5 px-4">
                <div className="text-xl font-bold mb-6 text-center">
                    Profile
                </div>
                <div className="grid grid-cols-3 font-semibold">
                    <div className="mr-3">
                        <p>Name</p>
                        <p>Username</p>
                        <p>Role</p>
                    </div>
                    <div className="col-span-2">
                        <p>: {currentSession.name}</p>
                        <p>: {currentSession.username}</p>
                        <p>: {currentSession.role}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}