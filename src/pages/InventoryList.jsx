import { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import Button from "../components/Button"
import Input from "../components/Input"
import Modal from "../components/Modal"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"

export default function InventoryList() {
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()
    const [inventoryList, setInventoryList] = useState([])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [createInventoryReq, setCreateInventoryReq] = useState({
        item_name: "",
        description: "",
        unit: "",
        price: ""
    })
    const [updateInventoryReq, setUpdateInventoryReq] = useState({
        id: "",
        item_name: "",
        description: "",
        unit: "",
        price: ""
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

    const handleAddInventory = () => {
        useCaseFactory.createInventory().execute(createInventoryReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        console.log(response.error_schema.error_message)
                        setIsModalAddOpen(false)
                        setCreateInventoryReq({
                            item_name: "",
                            unit: ""
                        })
                        getInventoryList()
                    }
                }
            })
    }

    const handleUpdateInventory = () => {
        useCaseFactory.updateInventory().execute(updateInventoryReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        console.log(response.error_schema.error_message)
                        setIsModalUpdateOpen(false)
                        setUpdateInventoryReq({
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
                    Add Inventory Item
                </Button>
                <Modal
                    isOpen={isModalAddOpen}
                    onClose={() => setIsModalAddOpen(false)}
                    title="Add Inventory Item"
                >
                    <Input
                        type="text"
                        placeholder="Item Name"
                        value={createInventoryReq.item_name}
                        onChange={(e) => setCreateInventoryReq({
                            ...createInventoryReq,
                            item_name: e.target.value
                        })}
                    />
                    <Input
                        type="text"
                        placeholder="Description"
                        value={createInventoryReq.description}
                        onChange={(e) => setCreateInventoryReq({
                            ...createInventoryReq,
                            description: e.target.value
                        })}
                    />
                    <Input
                        type="text"
                        placeholder="Unit"
                        value={createInventoryReq.unit}
                        onChange={(e) => setCreateInventoryReq({
                            ...createInventoryReq,
                            unit: e.target.value
                        })}
                    />
                    <Input
                        type="number"
                        placeholder="Price"
                        value={createInventoryReq.price}
                        onChange={(e) => setCreateInventoryReq({
                            ...createInventoryReq,
                            price: e.target.value
                        })}
                    />
                    <Button
                        onClick={handleAddInventory}
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
                <TableCell>Description</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                {currentSession.role == "admin" ?
                    <TableCell>Action</TableCell>
                    : <></>}
            </TableRowHead>
            {inventoryList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.item_name}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.unit}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.stock}</TableCell>
                    {currentSession.role == "admin" ?
                        <TableCell>
                            <Button
                                onClick={() => {
                                    setUpdateInventoryReq({
                                        id: data.id,
                                        item_name: data.item_name,
                                        description: data.description,
                                        unit: data.unit,
                                        price: data.price
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
            title="Edit Inventory"
        >
            <Input
                type="text"
                placeholder="Item Name"
                value={updateInventoryReq.item_name}
            />
            <Input
                type="text"
                placeholder="Description"
                value={updateInventoryReq.description}
                onChange={(e) => setUpdateInventoryReq({
                    ...updateInventoryReq,
                    description: e.target.value
                })}
            />
            <Input
                type="text"
                placeholder="Unit"
                value={updateInventoryReq.unit}
                onChange={(e) => setUpdateInventoryReq({
                    ...updateInventoryReq,
                    unit: e.target.value
                })}
            />
            <Input
                type="number"
                placeholder="Price"
                value={updateInventoryReq.price}
                onChange={(e) => setUpdateInventoryReq({
                    ...updateInventoryReq,
                    price: e.target.value
                })}
            />
            <Button
                onClick={handleUpdateInventory}
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