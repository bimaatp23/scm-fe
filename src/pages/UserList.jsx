import { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import TitlePage from "../components/TitlePage"

export default function UserList() {
    const useCaseFactory = new UseCaseFactory()
    const [userList, setUserList] = useState([])

    useEffect(() => {
        getUserList()
    }, ["static"])

    const getUserList = () => {
        useCaseFactory.getUserList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setUserList(response.output_schema)
                    }
                }
            })
    }

    return <>
        <TitlePage>User List</TitlePage>
        <table>
            <thead>
                <tr>
                    <th className="border border-black py-1 px-10">#</th>
                    <th className="border border-black py-1 px-10">Name</th>
                    <th className="border border-black py-1 px-10">Username</th>
                    <th className="border border-black py-1 px-10">Role</th>
                    <th className="border border-black py-1 px-10">Action</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((data, index) => {
                    return <tr key={index}>
                        <td className="border border-black py-1 px-10">{index + 1}</td>
                        <td className="border border-black py-1 px-10">{data.name}</td>
                        <td className="border border-black py-1 px-10">{data.username}</td>
                        <td className="border border-black py-1 px-10">{data.role}</td>
                        <td className="border border-black py-1 px-10">
                            <p><span>Edit</span> | <span>Hapus</span></p>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
}