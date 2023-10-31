import { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import TitlePage from "../components/TitlePage"
import Modal from "../components/Modal"

export default function UserList() {
    const useCaseFactory = new UseCaseFactory()
    const [userList, setUserList] = useState([])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [createUserReq, setCreateUserReq] = useState({
        name: "",
        username: "",
        role: ""
    })

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

    const handleOnSubmitAddUser = () => {
        useCaseFactory.createUser().execute(createUserReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        console.log(response.error_schema.error_message)
                        setIsModalAddOpen(false)
                        setCreateUserReq({
                            name: "",
                            username: "",
                            role: ""
                        })
                        getUserList()
                    }
                }
            })
    }

    return <>
        <TitlePage>User List</TitlePage>
        <button onClick={() => setIsModalAddOpen(true)}>Add User</button>
        <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
            <input
                type="text"
                placeholder="Name"
                value={createUserReq.name}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    name: e.target.value
                })}
            />
            <input
                type="text"
                placeholder="Username"
                value={createUserReq.username}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    username: e.target.value
                })}
            />
            <select
                value={createUserReq.role}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    role: e.target.value
                })}
            >
                <option value="">Role</option>
                <option value="pengadaan">Pengadaan</option>
                <option value="gudang">Gudang</option>
                <option value="produksi">Produksi</option>
                <option value="distribusi">Distribusi</option>
            </select>
            <button onClick={handleOnSubmitAddUser}>Add</button>
        </Modal>
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