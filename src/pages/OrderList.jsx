import { Document, PDFDownloadLink, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import { useEffect, useMemo, useState } from "react"
import BasicConstant from "../BasicConstant"
import { UseCaseFactory } from "../UseCaseFactory"
import { setConfirm, setNotification, toRupiah } from "../Utils"
import Button from "../components/Button"
import Input from "../components/Input"
import Modal from "../components/Modal"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"

export default function OrderList() {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const currentSession = useMemo(() => useCaseFactory.currentSession().get(), [useCaseFactory])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
    const [orderList, setOrderList] = useState([])
    const [detailOrderList, setDetailOrderList] = useState({
        total: 0,
        data: []
    })
    const [currentStatus, setCurrentStatus] = useState("")
    const [createOrderReq, setCreateOrderReq] = useState({
        total: 0,
        data: []
    })
    const [cancelOrderReq, setCancelOrderReq] = useState({
        order_id: ""
    })
    const [rejectOrderReq, setRejectOrderReq] = useState({
        order_id: ""
    })
    const [processOrderReq, setProcessOrderReq] = useState({
        order_id: ""
    })

    const styles = StyleSheet.create({
        page: {
            flexDirection: "row",
            backgroundColor: "#FFF",
            padding: 50,
            position: "relative"
        },
        section: {
            flexGrow: 1
        },
        bold: {
            fontFamily: "Helvetica-Bold"
        },
        italic: {
            fontFamily: "Times-Italic"
        },
        table: {
            flexDirection: "row",
            alignItems: "center",
            borderBottom: 1,
            borderLeft: 1,
            padding: 0,
            margin: 0
        },
        tableBlank: {
            flexDirection: "row",
            alignItems: "center",
            padding: 0,
            margin: 0
        },
        innerTable: {
            height: "100%",
            display: "flex",
            justifyContent: "center",
            paddingLeft: 2,
            paddingRight: 2,
            fontSize: 12,
            borderRight: 1
        },
        innerTableBlank: {
            height: "100%",
            display: "flex",
            justifyContent: "center",
            paddingLeft: 2,
            paddingRight: 2,
            fontSize: 12,
        },
        table1: {
            width: "5%",
        },
        table2: {
            width: "25%"
        },
        table3: {
            width: "20%"
        },
        table4: {
            width: "10%"
        },
        table5: {
            width: "15%"
        },
        table6: {
            width: "7%"
        },
        table7: {
            width: "18%"
        },
    })

    const [isStatic, setIsStatic] = useState(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            if (currentSession.role === BasicConstant.ROLE_RETAIL) {
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
            useCaseFactory.getOrderList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            const allowedStatus = [
                                BasicConstant.ORDER_STATUS_SUBMITTED,
                                BasicConstant.ORDER_STATUS_PROCESS
                            ]
                            if (currentSession.role === BasicConstant.ROLE_RETAIL) {
                                setOrderList(response.output_schema.filter((data) => allowedStatus.includes(data.status) && data.user_retail === currentSession.username))
                            } else {
                                setOrderList(response.output_schema.filter((data) => allowedStatus.includes(data.status)))
                            }
                        }
                    }
                })
        }
    }, [isStatic, useCaseFactory, currentSession])

    const getOrderList = () => {
        useCaseFactory.getOrderList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        const allowedStatus = [
                            BasicConstant.ORDER_STATUS_SUBMITTED,
                            BasicConstant.ORDER_STATUS_PROCESS
                        ]
                        if (currentSession.role === BasicConstant.ROLE_RETAIL) {
                            setOrderList(response.output_schema.filter((data) => allowedStatus.includes(data.status) && data.user_retail === currentSession.username))
                        } else {
                            setOrderList(response.output_schema.filter((data) => allowedStatus.includes(data.status)))
                        }
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

    const handleCancelOrder = () => {
        useCaseFactory.cancelOrder().execute(cancelOrderReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getOrderList()
                    }
                }
            })
    }

    const handleRejectOrder = () => {
        useCaseFactory.rejectOrder().execute(rejectOrderReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getOrderList()
                    }
                }
            })
    }

    const handleProcessOrder = () => {
        useCaseFactory.processOrder().execute(processOrderReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getOrderList()
                    }
                }
            })
    }

    const PurchaseOrderDoc = (props) => {
        const { orderId } = props
        const result = orderList.filter((data) => data.id === orderId)

        return <Document>
            <Page size={"A4"} style={styles.page}>
                <View style={styles.section}>
                    <Text style={{ ...styles.bold, textAlign: "center", fontSize: 16 }}>Purchase Order</Text>
                    <div style={{ marginBottom: 5 }} />
                    <Text style={{ ...styles.bold, textAlign: "center", fontSize: 12 }}>No. {result[0].id}</Text>
                    <Text style={{ textAlign: "center", fontSize: 12 }}>{result[0].submitted_date}</Text>
                    <div style={{ marginBottom: 15 }} />
                    <div style={{ ...styles.tableBlank }}>
                        <div style={{ ...styles.innerTableBlank, ...styles.bold, width: "50%" }}>
                            <Text>Vendor Information</Text>
                        </div>
                        <div style={{ ...styles.innerTableBlank, ...styles.bold, width: "50%" }}>
                            <Text>Shipping Address</Text>
                        </div>
                    </div>
                    <div style={{ ...styles.tableBlank }}>
                        <div style={{ ...styles.innerTableBlank, width: "50%" }}>
                            <Text>Vendor Name: PT Rajawali</Text>
                        </div>
                        <div style={{ ...styles.innerTableBlank, width: "50%" }}>
                            <Text>Business Name: {result[0].detail_retail.business_name}</Text>
                        </div>
                    </div>
                    <div style={{ ...styles.tableBlank }}>
                        <div style={{ ...styles.innerTableBlank, width: "50%" }}>
                            <Text>Address: Indonesia</Text>
                        </div>
                        <div style={{ ...styles.innerTableBlank, width: "50%" }}>
                            <Text>Address: {result[0].detail_retail.address}</Text>
                        </div>
                    </div>
                    <div style={{ ...styles.tableBlank }}>
                        <div style={{ ...styles.innerTableBlank, width: "50%" }}>
                            <Text>Phone: 081234512345</Text>
                        </div>
                        <div style={{ ...styles.innerTableBlank, width: "50%" }}>
                            <Text>Phone: {result[0].detail_retail.phone}</Text>
                        </div>
                    </div>
                    <div style={{ ...styles.tableBlank }}>
                        <div style={{ ...styles.innerTableBlank, width: "50%" }}>
                            <Text>Email: rajawali@gmail.com</Text>
                        </div>
                        <div style={{ ...styles.innerTableBlank, width: "50%" }}>
                            <Text>Email: {result[0].detail_retail.email}</Text>
                        </div>
                    </div>
                    <div style={{ marginBottom: 15 }} />
                    <div style={{ ...styles.table, borderTop: 1 }}>
                        <div style={{ ...styles.innerTable, ...styles.table1, ...styles.bold, textAlign: "center" }}>
                            <Text>#</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table2, ...styles.bold, textAlign: "center" }}>
                            <Text>Item Name</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table3, ...styles.bold, textAlign: "center" }}>
                            <Text>Description</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table4, ...styles.bold, textAlign: "center" }}>
                            <Text>Unit</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table5, ...styles.bold, textAlign: "center" }}>
                            <Text>Price</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table6, ...styles.bold, textAlign: "center" }}>
                            <Text>Qty</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table7, ...styles.bold, textAlign: "center" }}>
                            <Text>Sub Total</Text>
                        </div>
                    </div>
                    {result[0].items.map((data, index) => {
                        return <div style={{ ...styles.table }} key={index}>
                            <div style={{ ...styles.innerTable, ...styles.table1, textAlign: "center" }}>
                                <Text>{index + 1}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table2 }}>
                                <Text>{data.item_name}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table3 }}>
                                <Text>{data.description}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table4, textAlign: "center" }}>
                                <Text>{data.unit}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table5 }}>
                                <Text>{toRupiah(parseInt(data.price))}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table6, textAlign: "center" }}>
                                <Text>{data.quantity}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table7 }}>
                                <Text>{toRupiah(parseInt(data.price) * parseInt(data.quantity))}</Text>
                            </div>
                        </div>
                    })}
                    <div style={{ ...styles.table }}>
                        <div style={{ ...styles.innerTable, width: "82%", textAlign: "right" }}>
                            <Text>Total</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table7 }}>
                            <Text>{toRupiah(parseInt(result[0].total))}</Text>
                        </div>
                    </div>
                    <Text style={{ ...styles.bold, fontSize: 10, position: "absolute", right: 0, bottom: 0 }}>eSCM PT Rajawali</Text>
                </View>
            </Page>
        </Document>
    }

    return <>
        <TitlePage>{currentSession.role === BasicConstant.ROLE_RETAIL ? "My Order" : "Order List"}</TitlePage>
        {currentSession.role === BasicConstant.ROLE_RETAIL ?
            <>
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
                        onClick={() => createOrderReq.total > 0 ? setConfirm({ message: "Are you sure to create this order?", next: handleCreateOrder }) : {}}
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
                {currentSession.role !== BasicConstant.ROLE_RETAIL ?
                    <>
                        <TableCell>Order By</TableCell>
                        <TableCell>Download</TableCell>
                    </>
                    : <></>}
                <TableCell>Action</TableCell>
            </TableRowHead>
            {orderList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{toRupiah(parseInt(data.total))}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.process_date ?? data.submit_date}</TableCell>
                    {currentSession.role !== BasicConstant.ROLE_RETAIL ?
                        <>
                            <TableCell>{data.user_retail}</TableCell>
                            <TableCell>
                                {data.status === BasicConstant.ORDER_STATUS_SUBMITTED ?
                                    <PDFDownloadLink document={<PurchaseOrderDoc orderId={data.id} />} fileName={`Purchase-Order-${data.id}.pdf`}>
                                        {({ blob, url, loading, error }) => <Button
                                            size="md"
                                            color="yellow"
                                        >
                                            Purchase Order
                                        </Button>}
                                    </PDFDownloadLink> : <></>}
                            </TableCell>
                        </>
                        : <></>}
                    <TableCell>
                        <Button
                            onClick={() => {
                                setIsModalDetailOpen(true)
                                setDetailOrderList({
                                    total: parseInt(data.total),
                                    data: data.items
                                })
                                setCurrentStatus(data.status)
                                setCancelOrderReq({
                                    order_id: data.id
                                })
                                setRejectOrderReq({
                                    order_id: data.id
                                })
                                setProcessOrderReq({
                                    order_id: data.id
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
            {currentSession.role === BasicConstant.ROLE_RETAIL && currentStatus === BasicConstant.ORDER_STATUS_SUBMITTED ?
                <div
                    className="flex justify-center gap-2"
                >
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to cancel this order?", next: handleCancelOrder })}
                        size="md"
                        color="red"
                    >
                        Cancel
                    </Button>
                </div> : <></>}
            {currentSession.role === BasicConstant.ROLE_DISTRIBUSI && currentStatus === BasicConstant.ORDER_STATUS_SUBMITTED ?
                <div
                    className="flex justify-center gap-2"
                >
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to reject this order?", next: handleRejectOrder })}
                        size="md"
                        color="red"
                    >
                        Reject
                    </Button>
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to process this order?", next: handleProcessOrder })}
                        size="md"
                        color="green"
                    >
                        Process
                    </Button>
                </div> : <></>}
        </Modal>
    </>
}