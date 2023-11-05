import { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import { setNotification } from "../Utils"
import Button from "../components/Button"
import Input from "../components/Input"
import Modal from "../components/Modal"
import { Select, SelectOption } from "../components/Select"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
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

    const handleAddUser = () => {
        useCaseFactory.createUser().execute(createUserReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
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

    const handleUpdateUser = () => {
        useCaseFactory.updateUser().execute(updateUserReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        useCaseFactory.notification().set({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
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

    const handleDeleteUser = () => {
        useCaseFactory.deleteUser().execute(deleteUserReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        useCaseFactory.notification().set({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
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
        <Modal
            isOpen={isModalAddOpen}
            onClose={() => setIsModalAddOpen(false)}
            title="Add User"
        >
            <Input
                type="text"
                placeholder="Name"
                value={createUserReq.name}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    name: e.target.value
                })}
            />
            <Input
                type="text"
                placeholder="Username"
                value={createUserReq.username}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    username: e.target.value
                })}
            />
            <Select
                value={createUserReq.role}
                onChange={(e) => setCreateUserReq({
                    ...createUserReq,
                    role: e.target.value
                })}
            >
                <SelectOption value="">Role</SelectOption>
                <SelectOption value="pengadaan">Pengadaan</SelectOption>
                <SelectOption value="gudang">Gudang</SelectOption>
                <SelectOption value="produksi">Produksi</SelectOption>
                <SelectOption value="distribusi">Distribusi</SelectOption>
            </Select>
            <Button
                onClick={handleAddUser}
                size="md"
                color="blue"
            >
                Add
            </Button>
        </Modal>
        <Table>
            <TableRowHead>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
            </TableRowHead>
            {userList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.username}</TableCell>
                    <TableCell>{data.role}</TableCell>
                    <TableCell>
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
                    </TableCell>
                </TableRow>
            })}
        </Table>
        <Modal
            isOpen={isModalUpdateOpen}
            onClose={() => setIsModalUpdateOpen(false)}
            title="Edit User"
        >
            <Input
                type="text"
                placeholder="Name"
                value={updateUserReq.name}
                onChange={(e) => setUpdateUserReq({
                    ...updateUserReq,
                    name: e.target.value
                })}
            />
            <Select
                value={updateUserReq.role}
                onChange={(e) => setUpdateUserReq({
                    ...updateUserReq,
                    role: e.target.value
                })}
            >
                <SelectOption value="">Role</SelectOption>
                <SelectOption value="pengadaan">Pengadaan</SelectOption>
                <SelectOption value="gudang">Gudang</SelectOption>
                <SelectOption value="produksi">Produksi</SelectOption>
                <SelectOption value="distribusi">Distribusi</SelectOption>
            </Select>
            <Button
                onClick={handleUpdateUser}
                size="md"
                color="yellow"
            >
                Update
            </Button>
        </Modal>
        <Modal
            isOpen={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(false)}
            title="Delete User"
        >
            <p className="text-lg">Yakin hapus user ({deleteUserReq.username}) ?</p>
            <Button
                onClick={handleDeleteUser}
                size="md"
                color="red"
            >
                Delete
            </Button>
        </Modal>
    </>
}