import { useEffect, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import { setNotification, toRupiah } from "../Utils"
import Button from "../components/Button"
import Modal from "../components/Modal"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"
import Input from "../components/Input"

export default function MyOrder() {
    const useCaseFactory = new UseCaseFactory()
    const currentSession = useCaseFactory.currentSession().get()
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
    const [orderList, setOrderList] = useState([])
    const [createOrderReq, setCreateOrderReq] = useState({
        total: 0,
        data: []
    })
    const [detailOrderList, setDetailOrderList] = useState({
        total: 0,
        data: []
    })

    useEffect(() => {
        getInventoryList()
        getOrderList()
    }, ["static"])

    const getInventoryList = () => {
        useCaseFactory.getInventoryList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setCreateOrderReq({
                            total: 0,
                            data: response.output_schema.map((data) => {
                                return {
                                    inventory_id: data.id,
                                    item_name: data.item_name,
                                    description: data.description,
                                    unit: data.unit,
                                    price: parseInt(data.price),
                                    quantity: 0
                                }
                            })
                        })
                    }
                }
            })
    }

    const getOrderList = () => {
        useCaseFactory.getOrderList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setOrderList(response.output_schema.filter((data) => data.user_retail == currentSession.username))
                    }
                }
            })
    }

    const handleCreateOrder = () => {
        useCaseFactory.createOrder().execute(createOrderReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalAddOpen(false)
                        setCreateOrderReq({
                            total: 0,
                            data: createOrderReq.data.map((data) => {
                                return {
                                    inventory_id: data.inventory_id,
                                    item_name: data.item_name,
                                    description: data.description,
                                    unit: data.unit,
                                    price: parseInt(data.price),
                                    quantity: 0
                                }
                            })
                        })
                        getOrderList()
                    }
                }
            })
    }

    const handleShowDetail = (orderId) => {
        setIsModalDetailOpen(true)
        orderList.map((data) => {
            if (data.id == orderId) {
                setDetailOrderList({
                    total: parseInt(data.total),
                    data: data.items
                })
            }
        })
    }

    return <>
        <TitlePage>My Order</TitlePage>
        <Button
            onClick={() => setIsModalAddOpen(true)}
            size="md"
            color="blue"
            className="mb-2"
        >
            Create Order
        </Button>
        <Modal
            isOpen={isModalAddOpen}
            onClose={() => setIsModalAddOpen(false)}
            title="Create Order"
        >
            <Table>
                <TableRowHead>
                    <TableCell>#</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Sub Total</TableCell>
                </TableRowHead>
                {createOrderReq.data.map((data, index) => {
                    return <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.item_name}</TableCell>
                        <TableCell>{data.description}</TableCell>
                        <TableCell>{data.unit}</TableCell>
                        <TableCell>{toRupiah(data.price)}</TableCell>
                        <TableCell>
                            <Input
                                type="number"
                                value={data.quantity}
                                className="w-20"
                                onChange={(e) => {
                                    let newData = createOrderReq.data
                                    newData[index].quantity = e.target.value
                                    setCreateOrderReq({
                                        total: newData.reduce((accumulator, item) => {
                                            return accumulator + (item.price * item.quantity);
                                        }, 0),
                                        data: newData
                                    })
                                }}
                            />
                        </TableCell>
                        <TableCell>{toRupiah(data.price * data.quantity)}</TableCell>
                    </TableRow>
                })}
                <TableRow>
                    <TableCell
                        colSpan={6}
                        className="text-right"
                    >
                        Total
                    </TableCell>
                    <TableCell>{toRupiah(createOrderReq.total)}</TableCell>
                </TableRow>
            </Table>
            <Button
                onClick={() => createOrderReq.total > 0 ? handleCreateOrder() : setIsModalAddOpen(false)}
                size="md"
                color="blue"
            >
                Create
            </Button>
        </Modal>
        <Table>
            <TableRowHead>
                <TableCell>#</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
            </TableRowHead>
            {orderList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{toRupiah(parseInt(data.total))}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.reject_date ?? data.submit_date}</TableCell>
                    <TableCell>
                        <Button
                            onClick={() => handleShowDetail(data.id)}
                            size="md"
                            color="yellow"
                        >
                            Detail
                        </Button>
                    </TableCell>
                </TableRow>
            })}
        </Table>
        <Modal
            isOpen={isModalDetailOpen}
            onClose={() => setIsModalDetailOpen(false)}
            title="Detail Order"
        >
            <Table>
                <TableRowHead>
                    <TableCell>#</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Sub Total</TableCell>
                </TableRowHead>
                {detailOrderList.data.map((data, index) => {
                    return <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.item_name}</TableCell>
                        <TableCell>{data.description}</TableCell>
                        <TableCell>{data.unit}</TableCell>
                        <TableCell>{toRupiah(data.price)}</TableCell>
                        <TableCell>{data.quantity}</TableCell>
                        <TableCell>{toRupiah(data.price * data.quantity)}</TableCell>
                    </TableRow>
                })}
                <TableRow>
                    <TableCell
                        colSpan={6}
                        className="text-right"
                    >
                        Total
                    </TableCell>
                    <TableCell>{toRupiah(detailOrderList.total)}</TableCell>
                </TableRow>
            </Table>
        </Modal>
    </>
}