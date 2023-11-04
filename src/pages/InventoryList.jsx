import { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import Button from "../components/Button"
import Input from "../components/Input"
import Modal from "../components/Modal"
import { Select, SelectOption } from "../components/Select"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"

export default function InventoryList() {
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()
    const [inventoryList, setInventoryList] = useState([])
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
        getInventoryList()
    }, ["static"])

    const getInventoryList = () => {
        useCaseFactory.getInventoryList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setInventoryList(response.output_schema)
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
                        getInventoryList()
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
                        getInventoryList()
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
                        getInventoryList()
                    }
                }
            })
    }

    return <>
        <TitlePage>Inventory List</TitlePage>
        {currentSession.role == "admin" ?
            <>
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
                        onClick={handleOnSubmitAddUser}
                        size="md"
                        color="blue"
                    >
                        Add
                    </Button>
                </Modal>
            </> : <></>}
        <Table>
            <TableRowHead>
                <TableCell>#</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Stock</TableCell>
                {currentSession.role == "admin" ?
                    <TableCell>Action</TableCell>
                    : <></>}
            </TableRowHead>
            {inventoryList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.item_name}</TableCell>
                    <TableCell>{data.unit}</TableCell>
                    <TableCell>{data.stock}</TableCell>
                    {currentSession.role == "admin" ?
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
                        </TableCell> : <></>}
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
                onClick={handleOnSubmitUpdateUser}
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
                onClick={handleOnSubmitDeleteUser}
                size="md"
                color="red"
            >
                Delete
            </Button>
        </Modal>
    </>
}