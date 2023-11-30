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

export default function ProcurementList() {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const currentSession = useMemo(() => useCaseFactory.currentSession().get(), [useCaseFactory])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)

    const [supplierList, setSupplierList] = useState([])

    const [orderList, setOrderList] = useState([])
    const [detailOrderList, setDetailOrderList] = useState({
        total: 0,
        data: []
    })
    const [currentStatus, setCurrentStatus] = useState("")
    const [createProcurementReq, setCreateProcurementReq] = useState({
        total: 0,
        user_supplier: "",
        data: []
    })
    const [cancelProcurementReq, setCancelProcurementReq] = useState({
        procurement_id: ""
    })
    const [rejectProcurementReq, setRejectProcurementReq] = useState({
        procurement_id: ""
    })
    const [processProcurementReq, setProcessProcurementReq] = useState({
        procurement_id: ""
    })
    const [deliveryProcurementReq, setDeliveryProcurementReq] = useState({
        procurement_id: ""
    })
    const [arrivalProcurementReq, setArrivalProcurementReq] = useState({
        procurement_id: "",
        data: []
    })
    const [doneProcurementReq, setDoneProcurementReq] = useState({
        procurement_id: ""
    })

    const [isStatic, setIsStatic] = useState(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            useCaseFactory.getInventoryList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            setCreateProcurementReq({
                                total: 0,
                                user_supplier: "",
                                data: response.output_schema.filter((data) => data.tipe === BasicConstant.INVENTORY_BAHAN).map((data) => {
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
            useCaseFactory.getProcurementList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            const allowedStatus = [
                                BasicConstant.STATUS_SUBMITTED,
                                BasicConstant.STATUS_PROCESS,
                                BasicConstant.STATUS_DELIVERY,
                                BasicConstant.STATUS_ARRIVAL
                            ]
                            if (currentSession.role === BasicConstant.ROLE_SUPPLIER) {
                                setOrderList(response.output_schema.filter((data) => allowedStatus.includes(data.status) && data.user_supplier === currentSession.username))
                            } else {
                                setOrderList(response.output_schema.filter((data) => allowedStatus.includes(data.status)))
                            }
                        }
                    }
                })
            if ([BasicConstant.ROLE_ADMIN, BasicConstant.ROLE_PENGADAAN].includes(currentSession.role)) {
                useCaseFactory.getSupplierList().execute()
                    .subscribe({
                        next: (response) => {
                            if (response.error_schema.error_code === 200) {
                                setSupplierList(response.output_schema)
                            }
                        }
                    })
            }
        }
    }, [isStatic, useCaseFactory, currentSession])

    const getProcurementList = () => {
        useCaseFactory.getProcurementList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        const allowedStatus = [
                            BasicConstant.STATUS_SUBMITTED,
                            BasicConstant.STATUS_PROCESS,
                            BasicConstant.STATUS_DELIVERY,
                            BasicConstant.STATUS_ARRIVAL
                        ]
                        if (currentSession.role === BasicConstant.ROLE_SUPPLIER) {
                            setOrderList(response.output_schema.filter((data) => allowedStatus.includes(data.status) && data.user_supplier === currentSession.username))
                        } else {
                            setOrderList(response.output_schema.filter((data) => allowedStatus.includes(data.status)))
                        }
                    }
                }
            })
    }

    const handleCreateProcurement = () => {
        useCaseFactory.createProcurement().execute(createProcurementReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalAddOpen(false)
                        setCreateProcurementReq({
                            total: 0,
                            user_supplier: "",
                            data: createProcurementReq.data.map((data) => {
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
                        getProcurementList()
                    }
                }
            })
    }

    const handleCancelProcurement = () => {
        useCaseFactory.cancelProcurement().execute(cancelProcurementReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getProcurementList()
                    }
                }
            })
    }

    const handleRejectProcurement = () => {
        useCaseFactory.rejectProcurement().execute(rejectProcurementReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getProcurementList()
                    }
                }
            })
    }

    const handleProcessProcurement = () => {
        useCaseFactory.processProcurement().execute(processProcurementReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getProcurementList()
                    }
                }
            })
    }

    const handleDeliveryProcurement = () => {
        useCaseFactory.deliveryProcurement().execute(deliveryProcurementReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getProcurementList()
                    }
                }
            })
    }

    const handleArrivalProcurement = () => {
        useCaseFactory.arrivalProcurement().execute(arrivalProcurementReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getProcurementList()
                    }
                }
            })
    }

    const handleDoneProcurement = () => {
        useCaseFactory.doneProcurement().execute(doneProcurementReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getProcurementList()
                    }
                }
            })
    }

    return <>
        <TitlePage>Procurement List</TitlePage>
        {currentSession.role === BasicConstant.ROLE_PENGADAAN ?
            <>
                <Button
                    onClick={() => setIsModalAddOpen(true)}
                    size="md"
                    color="blue"
                    className="mb-2"
                >
                    Create Procurement
                </Button>
                <Modal
                    isOpen={isModalAddOpen}
                    onClose={() => setIsModalAddOpen(false)}
                    title="Create Procurement"
                >
                    <Select
                        value={createProcurementReq.user_supplier}
                        onChange={(e) => setCreateProcurementReq({
                            ...createProcurementReq,
                            user_supplier: e.target.value
                        })}
                    >
                        <SelectOption value="" key="default">Supplier</SelectOption>
                        {supplierList.map((data, index) => <SelectOption value={data.username} key={index}>{data.business_name}</SelectOption>)}
                    </Select>
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
                        {createProcurementReq.data.map((data, index) => {
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
                                            let newData = createProcurementReq.data
                                            newData[index].quantity = e.target.value
                                            setCreateProcurementReq({
                                                total: newData.reduce((accumulator, item) => {
                                                    return accumulator + (item.price * item.quantity)
                                                }, 0),
                                                user_supplier: createProcurementReq.user_supplier,
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
                            <TableCell>{toRupiah(createProcurementReq.total)}</TableCell>
                        </TableRow>
                    </Table>
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to create this procurement?", next: handleCreateProcurement })}
                        size="md"
                        color="blue"
                    >
                        Create
                    </Button>
                </Modal>
            </>
            : <></>}
        <Table>
            <TableRowHead>
                <TableCell>#</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update Date</TableCell>
                {currentSession.role !== BasicConstant.ROLE_SUPPLIER ?
                    <TableCell>Order To</TableCell> : <></>}
                <TableCell>Download</TableCell>
                <TableCell>Action</TableCell>
            </TableRowHead>
            {orderList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{toRupiah(parseInt(data.total))}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.arrival_date ?? data.delivery_date ?? data.process_date ?? data.submit_date}</TableCell>
                    {currentSession.role !== BasicConstant.ROLE_SUPPLIER ?
                        <TableCell>{data.user_supplier}</TableCell> : <></>}
                    <TableCell></TableCell>
                    <TableCell>
                        <Button
                            onClick={() => {
                                setIsModalDetailOpen(true)
                                setDetailOrderList({
                                    total: parseInt(data.total),
                                    data: data.items
                                })
                                setCurrentStatus(data.status)
                                setCancelProcurementReq({
                                    procurement_id: data.id
                                })
                                setRejectProcurementReq({
                                    procurement_id: data.id
                                })
                                setProcessProcurementReq({
                                    procurement_id: data.id
                                })
                                setDeliveryProcurementReq({
                                    procurement_id: data.id
                                })
                                setArrivalProcurementReq({
                                    procurement_id: data.id,
                                    data: data.items
                                })
                                setDoneProcurementReq({
                                    procurement_id: data.id
                                })
                            }}
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
                    {currentSession.role === BasicConstant.ROLE_DISTRIBUSI && currentStatus === BasicConstant.STATUS_SUBMITTED ?
                        <TableCell>Stock</TableCell>
                        : <></>}
                    <TableCell>Sub Total</TableCell>
                </TableRowHead>
                {detailOrderList.data.map((data, index) => {
                    return <TableRow key={index} className={currentSession.role === BasicConstant.ROLE_DISTRIBUSI && currentStatus === BasicConstant.STATUS_SUBMITTED && !data.is_valid ? "text-red-500" : "text-black"}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.item_name}</TableCell>
                        <TableCell>{data.description}</TableCell>
                        <TableCell>{data.unit}</TableCell>
                        <TableCell>{toRupiah(data.price)}</TableCell>
                        <TableCell>{data.quantity}</TableCell>
                        {currentSession.role === BasicConstant.ROLE_DISTRIBUSI && currentStatus === BasicConstant.STATUS_SUBMITTED ?
                            <TableCell>{data.stock}</TableCell>
                            : <></>}
                        <TableCell>{toRupiah(data.price * data.quantity)}</TableCell>
                    </TableRow>
                })}
                <TableRow>
                    <TableCell
                        colSpan={currentSession.role === BasicConstant.ROLE_DISTRIBUSI && currentStatus === BasicConstant.STATUS_SUBMITTED ? 7 : 6}
                        className="text-right"
                    >
                        Total
                    </TableCell>
                    <TableCell>{toRupiah(detailOrderList.total)}</TableCell>
                </TableRow>
            </Table>
            <div
                className="flex justify-center gap-2"
            >
                {currentSession.role === BasicConstant.ROLE_PENGADAAN && currentStatus === BasicConstant.STATUS_SUBMITTED ?
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to cancel this procurement?", next: handleCancelProcurement })}
                        size="md"
                        color="red"
                    >
                        Cancel
                    </Button> : <></>}
                {currentSession.role === BasicConstant.ROLE_SUPPLIER && currentStatus === BasicConstant.STATUS_SUBMITTED ?
                    <>
                        <Button
                            onClick={() => setConfirm({ message: "Are you sure to reject this procurement?", next: handleRejectProcurement })}
                            size="md"
                            color="red"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={() => setConfirm({ message: "Are you sure to process this procurement?", next: handleProcessProcurement })}
                            size="md"
                            color={"green"}
                        >
                            Process
                        </Button>
                    </> : <></>}
                {currentSession.role === BasicConstant.ROLE_SUPPLIER && currentStatus === BasicConstant.STATUS_PROCESS ?
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to delivery this procurement?", next: handleDeliveryProcurement })}
                        size="md"
                        color="green"
                    >
                        Delivery
                    </Button> : <></>}
                {currentSession.role === BasicConstant.ROLE_PENGADAAN && currentStatus === BasicConstant.STATUS_DELIVERY ?
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to arrival this procurement?", next: handleArrivalProcurement })}
                        size="md"
                        color="green"
                    >
                        Arrival
                    </Button> : <></>}
                {currentSession.role === BasicConstant.ROLE_SUPPLIER && currentStatus === BasicConstant.STATUS_ARRIVAL ?
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to done this procurement?", next: handleDoneProcurement })}
                        size="md"
                        color="green"
                    >
                        Done
                    </Button> : <></>}
            </div>
        </Modal>
    </>
}