import { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import Modal from "../components/Modal"
import TitlePage from "../components/TitlePage"

export default function UserList() {
    const useCaseFactory = new UseCaseFactory()
    const [userList, setUserList] = useState([])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [createUserReq, setCreateUserReq] = useState({
        name: "",
        username: "",
        role: ""
    })
    const [updateUserReq, setUpdateUserReq] = useState({
        name: "",
        username: "",
        role: ""
    })
    const [deleteUserReq, setDeleteUserReq] = useState({
        username: ""
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

    const handleOnSubmitUpdateUser = () => {
        useCaseFactory.updateUser().execute(updateUserReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        console.log(response.error_schema.error_message)
                        setIsModalUpdateOpen(false)
                        setUpdateUserReq({
                            name: "",
                            username: "",
                            role: ""
                        })
                        getUserList()
                    }
                }
            })
    }

    const handleOnSubmitDeleteUser = () => {
        useCaseFactory.deleteUser().execute(deleteUserReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        console.log(response.error_schema.error_message)
                        setIsModalDeleteOpen(false)
                        setDeleteUserReq({
                            username: ""
                        })
                        getUserList()
                    }
                }
            })
    }

    return <>
        <TitlePage>User List</TitlePage>
        <button onClick={() => setIsModalAddOpen(true)} className="bg-sky-700 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg mb-3 focus:shadow-outline focus:outline-none">Add User</button>
        <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
            <p className="text-xl font-bold mb-4">Add User</p>
            <input
                className="border border-black rounded-sm py-2 pl-2 mr-2"
                type="text"
                placeholder="Name"
                value={createUserReq.name}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    name: e.target.value
                })}
            />
            <input
                className="border border-black rounded-sm py-2 pl-2 mr-2"
                type="text"
                placeholder="Username"
                value={createUserReq.username}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    username: e.target.value
                })}
            />
            <select
                className="border border-black rounded-sm py-2 pl-2 mr-2"
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
            <button className="bg-sky-700 text-white font-semibold text-center rounded-md py-2 px-4 ml-2 hover:bg-sky-500" onClick={handleOnSubmitAddUser}>Add</button>
        </Modal>
        <table className="border-2 border-slate-300">
            <thead className="bg-slate-200">
                <tr>
                    <th className="border-y-2 py-3 px-4 border-slate-300">#</th>
                    <th className="border-y-2 py-3 pl-2 pr-10 border-slate-300 text-start">Name</th>
                    <th className="border-y-2 py-3 px-10 border-slate-300 text-start">Username</th>
                    <th className="border-y-2 py-3 px-10 border-slate-300 text-start">Role</th>
                    <th className="border-y-2 py-3 px-10 border-slate-300 text-start">Action</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((data, index) => {
                    return <tr key={index}>
                        <td className="border-y-2 py-3 px-4 border-slate-300">{index + 1}</td>
                        <td className="border-y-2 py-3 pl-2 pr-10 border-slate-300 text-start">{data.name}</td>
                        <td className="border-y-2 py-3 px-10 border-slate-300 text-start">{data.username}</td>
                        <td className="border-y-2 py-3 px-10 border-slate-300 text-start">{data.role}</td>
                        <td className="border-y-2 py-3 px-10 border-slate-300 text-start">
                            <p><span
                                className="bg-amber-400 px-4 py-2 rounded-md font-semibold text-white hover:bg-amber-300"
                                onClick={() => {
                                    setUpdateUserReq({
                                        name: data.name,
                                        username: data.username,
                                        role: data.role
                                    })
                                    setIsModalUpdateOpen(true)
                                }}>Edit</span> | <span
                                    className="bg-red-500 px-4 py-2 rounded-md font-semibold text-white hover:bg-red-400"
                                    onClick={() => {
                                        setDeleteUserReq({
                                            username: data.username
                                        })
                                        setIsModalDeleteOpen(true)
                                    }}>Hapus</span></p>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        <Modal isOpen={isModalUpdateOpen} onClose={() => setIsModalUpdateOpen(false)}>
            <p className="text-xl font-bold mb-4">Edit Profile</p>
            <input
                className="border border-black rounded-sm py-2 pl-2 mr-2"
                type="text"
                placeholder="Name"
                value={updateUserReq.name}
                onChange={(e) => setUpdateUserReq({
                    ...updateUserReq,
                    name: e.target.value
                })}
            />
            <select
                className="border border-black rounded-sm py-2 pl-2 mr-2"
                value={updateUserReq.role}
                onChange={(e) => setUpdateUserReq({
                    ...updateUserReq,
                    role: e.target.value
                })}
            >
                <option value="">Role</option>
                <option value="pengadaan">Pengadaan</option>
                <option value="gudang">Gudang</option>
                <option value="produksi">Produksi</option>
                <option value="distribusi">Distribusi</option>
            </select>
            <button className="bg-amber-400 rounded-md py-2 px-4 ml-2 hover:bg-amber-300" onClick={handleOnSubmitUpdateUser}>Update</button>
        </Modal>
        <Modal isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)}>
            <p className="text-lg">Yakin hapus user ({deleteUserReq.username}) ?</p>
            <div className="flex justify-center mt-2">
                <button className="bg-red-500 rounded-md py-2 px-4 mt-2 text-lg font-bold text-white" onClick={handleOnSubmitDeleteUser}>Delete</button>
            </div>
        </Modal>
    </>
}