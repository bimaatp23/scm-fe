import { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import Button from "../components/Button"
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
        <Button
            onClick={() => setIsModalAddOpen(true)}
            size="md"
            color="blue"
            className="mb-2"
        >
            Add User
        </Button>
        <Modal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)}>
            <p className="text-xl font-bold text-center">Add User</p>
            <input
                className="border border-black rounded-sm py-2 pl-2"
                type="text"
                placeholder="Name"
                value={createUserReq.name}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    name: e.target.value
                })}
            />
            <input
                className="border border-black rounded-sm py-2 pl-2"
                type="text"
                placeholder="Username"
                value={createUserReq.username}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    username: e.target.value
                })}
            />
            <select
                className="border border-black rounded-sm py-2 pl-2"
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
            <Button
                onClick={handleOnSubmitAddUser}
                size="md"
                color="blue"
            >
                Add
            </Button>
        </Modal>
        <table className="border-2 border-slate-300">
            <thead className="bg-slate-200">
                <tr>
                    <th className="border-2 py-2 border-slate-300">#</th>
                    <th className="border-2 py-2 border-slate-300 text-center">Name</th>
                    <th className="border-2 py-2 border-slate-300 text-center">Username</th>
                    <th className="border-2 py-2 border-slate-300 text-center">Role</th>
                    <th className="border-2 py-2 border-slate-300 text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((data, index) => {
                    return <tr key={index}>
                        <td className="border-2 py-2 px-4 border-slate-300">{index + 1}</td>
                        <td className="border-2 py-2 pl-2 pr-10 border-slate-300">{data.name}</td>
                        <td className="border-2 py-2 px-10 border-slate-300">{data.username}</td>
                        <td className="border-2 py-2 px-10 border-slate-300">{data.role}</td>
                        <td className="border-2 py-2 px-10 border-slate-300">
                            <Button
                                onClick={() => {
                                    setUpdateUserReq({
                                        name: data.name,
                                        username: data.username,
                                        role: data.role
                                    })
                                    setIsModalUpdateOpen(true)
                                }}
                                size="md"
                                color="yellow"
                                className="mx-1"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => {
                                    setDeleteUserReq({
                                        username: data.username
                                    })
                                    setIsModalDeleteOpen(true)
                                }}
                                size="md"
                                color="red"
                                className="mx-1"
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        <Modal isOpen={isModalUpdateOpen} onClose={() => setIsModalUpdateOpen(false)}>
            <p className="text-xl font-bold text-center">Edit User</p>
            <input
                className="border border-black rounded-sm py-2 pl-2"
                type="text"
                placeholder="Name"
                value={updateUserReq.name}
                onChange={(e) => setUpdateUserReq({
                    ...updateUserReq,
                    name: e.target.value
                })}
            />
            <select
                className="border border-black rounded-sm py-2 pl-2"
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
            <Button
                onClick={handleOnSubmitUpdateUser}
                size="md"
                color="yellow"
            >
                Update
            </Button>
        </Modal>
        <Modal isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)}>
            <p className="text-xl font-bold text-center">Delete User</p>
            <p className="text-lg">Yakin hapus user ({deleteUserReq.username}) ?</p>
            <Button
                onClick={handleOnSubmitDeleteUser}
                size="md"
                color="red"
            >
                Delete
            </Button>
        </Modal>
    </>
}