import { useEffect, useMemo, useState } from "react"
import BasicConstant from "../BasicConstant"
import { UseCaseFactory } from "../UseCaseFactory"
import { setConfirm, setNotification, toRupiah } from "../Utils"
import Button from "../components/Button"
import Input from "../components/Input"
import Modal from "../components/Modal"
import { Select, SelectOption } from "../components/Select"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"

export default function ProductList() {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const currentSession = useCaseFactory.currentSession().get()
    const [inventoryList, setInventoryList] = useState([])
    const [productList, setProductList] = useState([])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [createProductReq, setCreateProductReq] = useState({
        inventory_id: "",
        price: ""
    })
    const [updateProductReq, setUpdateProductReq] = useState({
        id: "",
        inventory_id: "",
        price: ""
    })
    const [deleteProductReq, setDeleteProductReq] = useState({
        id: ""
    })

    const [isStatic, setIsStatic] = useState(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            useCaseFactory.getInventoryList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            setInventoryList(response.output_schema.filter((data) => data.tipe === BasicConstant.INVENTORY_BAHAN))
                        }
                    }
                })
            useCaseFactory.getProductList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            setProductList(response.output_schema)
                        }
                    }
                })
        }
    }, [isStatic, useCaseFactory])

    const getProductList = () => {
        useCaseFactory.getProductList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setProductList(response.output_schema)
                    }
                }
            })
    }

    const validateCreateInventoryReq = () => {
        return !(createProductReq.inventory_id === "" ||
            createProductReq.price === "")
    }

    const handleCreateProduct = () => {
        useCaseFactory.createProduct().execute(createProductReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalAddOpen(false)
                        setCreateProductReq({
                            inventory_id: "",
                            price: "",
                        })
                        getProductList()
                    }
                }
            })
    }

    const validateUpdateInventoryReq = () => {
        return !(updateProductReq.id === "" ||
            updateProductReq.inventory_id === "" ||
            updateProductReq.price === "")
    }

    const handleUpdateProduct = () => {
        useCaseFactory.updateProduct().execute(updateProductReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalUpdateOpen(false)
                        getProductList()
                    }
                }
            })
    }

    const handleDeleteProduct = () => {
        useCaseFactory.deleteProduct().execute(deleteProductReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        getProductList()
                    }
                }
            })
    }

    return <>
        <TitlePage>My Product</TitlePage>
        <Button
            onClick={() => setIsModalAddOpen(true)}
            size="md"
            color="blue"
            className="mb-2"
        >
            Add Product Item
        </Button>
        <Modal
            isOpen={isModalAddOpen}
            onClose={() => setIsModalAddOpen(false)}
            title="Add Product Item"
        >
            <Select
                value={createProductReq.inventory_id}
                onChange={(e) => setCreateProductReq({
                    ...createProductReq,
                    inventory_id: e.target.value
                })}
            >
                <SelectOption value="" key="default">Item Name</SelectOption>
                {inventoryList.map((data, index) => {
                    return <SelectOption value={data.id} key={index}>{data.item_name}</SelectOption>
                })}
            </Select>
            <Input
                type="number"
                placeholder="Price"
                value={createProductReq.price}
                onChange={(e) => setCreateProductReq({
                    ...createProductReq,
                    price: e.target.value
                })}
            />
            <Button
                onClick={() => validateCreateInventoryReq() ? setConfirm({ message: "Are you sure to create this product?", next: handleCreateProduct }) : {}}
                size="md"
                color="blue"
            >
                Add
            </Button>
        </Modal>
        <Table>
            <TableRowHead>
                <TableCell>#</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Tipe</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
            </TableRowHead>
            {productList.filter((data) => data.user_supplier === currentSession.username).map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.item_name}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.unit}</TableCell>
                    <TableCell>{data.tipe}</TableCell>
                    <TableCell>{toRupiah(parseInt(data.price))}</TableCell>
                    <TableCell>
                        <Button
                            onClick={() => {
                                setIsModalUpdateOpen(true)
                                setUpdateProductReq({
                                    id: data.id,
                                    inventory_id: data.inventory_id,
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
                                setDeleteProductReq({
                                    id: data.id
                                })
                                setConfirm({ message: "Are you sure to delete this product?", next: handleDeleteProduct })
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
            title="Edit Product"
        >
            <Select
                value={updateProductReq.inventory_id}
            >
                <SelectOption value="" key="default">Item Name</SelectOption>
                {inventoryList.map((data, index) => {
                    return <SelectOption value={data.id} key={index}>{data.item_name}</SelectOption>
                })}
            </Select>
            <Input
                type="number"
                placeholder="Price"
                value={updateProductReq.price}
                onChange={(e) => setUpdateProductReq({
                    ...updateProductReq,
                    price: e.target.value
                })}
            />
            <Button
                onClick={() => validateUpdateInventoryReq() ? setConfirm({ message: "Are you sure to update this product?", next: handleUpdateProduct }) : {}}
                size="md"
                color="yellow"
            >
                Update
            </Button>
        </Modal>
    </>
}