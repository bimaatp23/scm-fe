import { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import { setNotification, toRupiah } from "../Utils"
import Button from "../components/Button"
import Input from "../components/Input"
import Modal from "../components/Modal"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"

export default function InventoryList() {
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()
    const [inventoryList, setInventoryList] = useState([])
    const [inventoryItemList, setInventoryItemList] = useState([])
    const [selectedInventoryItemList, setSelectedInventoryItemList] = useState([])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
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
    const [deleteInventoryReq, setDeleteInventoryReq] = useState({
        id: "",
        item_name: ""
    })

    useEffect(() => {
        getInventoryList()
        getInventoryItemList()
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

    const getInventoryItemList = () => {
        useCaseFactory.getInventoryItemList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setInventoryItemList(response.output_schema)
                    }
                }
            })
    }

    const handleAddInventory = () => {
        useCaseFactory.createInventory().execute(createInventoryReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
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
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
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

    const handleDeleteInventory = () => {
        useCaseFactory.deleteInventory().execute(deleteInventoryReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDeleteOpen(false)
                        setDeleteInventoryReq({
                            id: "",
                            item_name: ""
                        })
                        getInventoryList()
                    }
                }
            })
    }

    return <>
        <TitlePage>Inventory List</TitlePage>
        {currentSession.role === "gudang" ?
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
                <TableCell>Action</TableCell>
            </TableRowHead>
            {inventoryList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.item_name}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.unit}</TableCell>
                    <TableCell>{toRupiah(parseInt(data.price))}</TableCell>
                    <TableCell>{data.stock}</TableCell>
                    <TableCell>
                        <Button
                            onClick={() => {
                                setSelectedInventoryItemList(inventoryItemList.filter((data2) => data2.inventory_id === data.id))
                                setIsModalDetailOpen(true)
                            }}
                            size="md"
                            color="yellow"
                            className="mx-1"
                        >
                            Detail
                        </Button>
                        {currentSession.role === "gudang" ?
                            <>
                                <Button
                                    onClick={() => {
                                        setIsModalUpdateOpen(true)
                                        setUpdateInventoryReq({
                                            id: data.id,
                                            item_name: data.item_name,
                                            description: data.description,
                                            unit: data.unit,
                                            price: data.price
                                        })
                                    }}
                                    size="md"
                                    color="yellow"
                                    className="mx-1"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => {
                                        setDeleteInventoryReq({
                                            id: data.id,
                                            item_name: data.item_name
                                        })
                                        setIsModalDeleteOpen(true)
                                    }}
                                    size="md"
                                    color="red"
                                    className="mx-1"
                                >
                                    Delete
                                </Button>
                            </> : <></>}
                    </TableCell>
                </TableRow>
            })}
        </Table>
        <Modal
            isOpen={isModalDetailOpen}
            onClose={() => setIsModalDetailOpen(false)}
            title="Detail Inventory"
        >
            <Table>
                <TableRowHead>
                    <TableCell>#</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Status</TableCell>
                </TableRowHead>
                {selectedInventoryItemList.map((data, index) => {
                    return <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.quantity}</TableCell>
                        <TableCell>{data.status}</TableCell>
                    </TableRow>
                })}
            </Table>
        </Modal>
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
            <p className="text-lg">Yakin hapus item ({deleteInventoryReq.item_name}) ?</p>
            <Button
                onClick={handleDeleteInventory}
                size="md"
                color="red"
            >
                Delete
            </Button>
        </Modal>
    </>
}