import { Document, PDFDownloadLink, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import { useEffect, useMemo, useState } from "react"
import BasicConstant from "../BasicConstant"
import { UseCaseFactory } from "../UseCaseFactory"
import { setConfirm, setNotification } from "../Utils"
import Button from "../components/Button"
import Input from "../components/Input"
import Modal from "../components/Modal"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"

export default function ProductionList() {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const currentSession = useMemo(() => useCaseFactory.currentSession().get(), [useCaseFactory])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
    const [stockList, setStockList] = useState([])
    const [productionList, setProductionList] = useState([])
    const [detailProductionList, setDetailProductionList] = useState({
        material: [],
        product: []
    })
    const [currentStatus, setCurrentStatus] = useState("")
    const [createProductionReq, setCreateProductionReq] = useState({
        material: [],
        product: []
    })
    const [cancelProductionReq, setCancelProductionReq] = useState({
        production_id: ""
    })
    const [rejectProductionReq, setRejectProductionReq] = useState({
        production_id: ""
    })
    const [processProductionReq, setProcessProductionReq] = useState({
        is_valid: true,
        production_id: "",
        material: []
    })
    const [doneProductionReq, setDoneProductionReq] = useState({
        production_id: "",
        product: []
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
            fontSize: 12
        },
        table1: {
            width: "10%"
        },
        table2: {
            width: "50%"
        },
        table3: {
            width: "20%"
        },
        table4: {
            width: "20%"
        }
    })

    const [isStatic, setIsStatic] = useState(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            useCaseFactory.getInventoryList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            setStockList(response.output_schema.filter((data) => data.tipe === BasicConstant.INVENTORY_BAHAN))
                            setCreateProductionReq({
                                material: response.output_schema.filter((data) => data.tipe === BasicConstant.INVENTORY_BAHAN).map((data) => {
                                    return {
                                        inventory_id: data.id,
                                        item_name: data.item_name,
                                        unit: data.unit,
                                        tipe: data.tipe,
                                        quantity: 0
                                    }
                                }),
                                product: response.output_schema.filter((data) => data.tipe === BasicConstant.INVENTORY_PRODUK).map((data) => {
                                    return {
                                        inventory_id: data.id,
                                        item_name: data.item_name,
                                        unit: data.unit,
                                        tipe: data.tipe,
                                        quantity: 0
                                    }
                                })
                            })
                        }
                    }
                })
            useCaseFactory.getProductionList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            const allowedStatus = [
                                BasicConstant.STATUS_SUBMITTED,
                                BasicConstant.STATUS_PROCESS
                            ]
                            setProductionList(response.output_schema.filter((data) => allowedStatus.includes(data.status)))
                        }
                    }
                })
        }
    }, [isStatic, useCaseFactory, currentSession])

    const getStockList = () => {
        useCaseFactory.getInventoryList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setStockList(response.output_schema.filter((data) => data.tipe === BasicConstant.INVENTORY_BAHAN))
                    }
                }
            })
    }

    const getProductionList = () => {
        useCaseFactory.getProductionList().execute()
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        const allowedStatus = [
                            BasicConstant.STATUS_SUBMITTED,
                            BasicConstant.STATUS_PROCESS
                        ]
                        setProductionList(response.output_schema.filter((data) => allowedStatus.includes(data.status)))
                    }
                }
            })
    }

    const handleCreateProduction = () => {
        useCaseFactory.createProduction().execute(createProductionReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalAddOpen(false)
                        setCreateProductionReq({
                            material: createProductionReq.material.map((data) => {
                                return {
                                    inventory_id: data.id,
                                    item_name: data.item_name,
                                    unit: data.unit,
                                    tipe: data.tipe,
                                    quantity: 0
                                }
                            }),
                            product: createProductionReq.product.map((data) => {
                                return {
                                    inventory_id: data.id,
                                    item_name: data.item_name,
                                    unit: data.unit,
                                    tipe: data.tipe,
                                    quantity: 0
                                }
                            })
                        })
                        getProductionList()
                    }
                }
            })
    }

    const handleCancelProduction = () => {
        useCaseFactory.cancelProduction().execute(cancelProductionReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getProductionList()
                    }
                }
            })
    }

    const handleRejectProduction = () => {
        useCaseFactory.rejectProduction().execute(rejectProductionReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getProductionList()
                    }
                }
            })
    }

    const handleProcessProduction = () => {
        useCaseFactory.processProduction().execute(processProductionReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getStockList()
                        getProductionList()
                    }
                }
            })
    }

    const handleDoneProduction = () => {
        useCaseFactory.doneProduction().execute(doneProductionReq)
            .subscribe({
                next: (response) => {
                    if (response.error_schema.error_code === 200) {
                        setNotification({
                            icon: "success",
                            message: response.error_schema.error_message
                        })
                        setIsModalDetailOpen(false)
                        getProductionList()
                    }
                }
            })
    }

    const MaterialRequisitionDoc = (props) => {
        const { productionId } = props
        const result = productionList.filter((data) => data.id === productionId)

        return <Document>
            <Page size={"A4"} style={styles.page}>
                <View style={styles.section}>
                    <Text style={{ ...styles.bold, textAlign: "center", fontSize: 16 }}>Material Requisition</Text>
                    <div style={{ marginBottom: 5 }} />
                    <Text style={{ ...styles.bold, textAlign: "center", fontSize: 12 }}>No. {result[0].id}</Text>
                    <Text style={{ textAlign: "center", fontSize: 12 }}>{result[0].submit_date}</Text>
                    <div style={{ marginBottom: 15 }} />
                    <div style={{ ...styles.table, borderTop: 1 }}>
                        <div style={{ ...styles.innerTable, ...styles.table1, ...styles.bold, textAlign: "center" }}>
                            <Text>#</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table2, ...styles.bold, textAlign: "center" }}>
                            <Text>Material Name</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table3, ...styles.bold, textAlign: "center" }}>
                            <Text>Unit</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table4, ...styles.bold, textAlign: "center" }}>
                            <Text>Quantity</Text>
                        </div>
                    </div>
                    {result[0].material.map((data, index) => {
                        return <div style={{ ...styles.table }} key={index}>
                            <div style={{ ...styles.innerTable, ...styles.table1, textAlign: "center" }}>
                                <Text>{index + 1}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table2 }}>
                                <Text>{data.item_name}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table3, textAlign: "center" }}>
                                <Text>{data.unit}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table4, textAlign: "center" }}>
                                <Text>{data.quantity}</Text>
                            </div>
                        </div>
                    })}
                    <div style={{ marginBottom: 15 }} />
                    <div style={{ ...styles.table, borderTop: 1 }}>
                        <div style={{ ...styles.innerTable, ...styles.table1, ...styles.bold, textAlign: "center" }}>
                            <Text>#</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table2, ...styles.bold, textAlign: "center" }}>
                            <Text>Product Name</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table3, ...styles.bold, textAlign: "center" }}>
                            <Text>Unit</Text>
                        </div>
                        <div style={{ ...styles.innerTable, ...styles.table4, ...styles.bold, textAlign: "center" }}>
                            <Text>Quantity</Text>
                        </div>
                    </div>
                    {result[0].product.map((data, index) => {
                        return <div style={{ ...styles.table }} key={index}>
                            <div style={{ ...styles.innerTable, ...styles.table1, textAlign: "center" }}>
                                <Text>{index + 1}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table2 }}>
                                <Text>{data.item_name}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table3, textAlign: "center" }}>
                                <Text>{data.unit}</Text>
                            </div>
                            <div style={{ ...styles.innerTable, ...styles.table4, textAlign: "center" }}>
                                <Text>{data.quantity}</Text>
                            </div>
                        </div>
                    })}
                    <Text style={{ ...styles.bold, fontSize: 10, position: "absolute", right: 0, bottom: 0 }}>eSCM PT Rajawali</Text>
                </View>
            </Page>
        </Document>
    }

    return <>
        <TitlePage>Production List</TitlePage>
        {currentSession.role === BasicConstant.ROLE_PRODUKSI ?
            <>
                <Button
                    onClick={() => setIsModalAddOpen(true)}
                    size="md"
                    color="blue"
                    className="mb-2"
                >
                    Create Production
                </Button>
                <Modal
                    isOpen={isModalAddOpen}
                    onClose={() => setIsModalAddOpen(false)}
                    title="Create Production"
                >
                    <div className="grid grid-flow-col gap-x-4">
                        <div>
                            <Table>
                                <TableRowHead>
                                    <TableCell>#</TableCell>
                                    <TableCell>Material Name</TableCell>
                                    <TableCell>Unit</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRowHead>
                                {createProductionReq.material.map((data, index) => {
                                    return <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{data.item_name}</TableCell>
                                        <TableCell>{data.unit}</TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={data.quantity}
                                                className="w-20"
                                                onChange={(e) => {
                                                    let newData = createProductionReq.material
                                                    newData[index].quantity = e.target.value
                                                    setCreateProductionReq({
                                                        ...createProductionReq,
                                                        material: newData
                                                    })
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                })}
                            </Table>
                        </div>
                        <div>
                            <Table>
                                <TableRowHead>
                                    <TableCell>#</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Unit</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRowHead>
                                {createProductionReq.product.map((data, index) => {
                                    return <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{data.item_name}</TableCell>
                                        <TableCell>{data.unit}</TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={data.quantity}
                                                className="w-20"
                                                onChange={(e) => {
                                                    let newData = createProductionReq.product
                                                    newData[index].quantity = e.target.value
                                                    setCreateProductionReq({
                                                        ...createProductionReq,
                                                        product: newData
                                                    })
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                })}
                            </Table>
                        </div>
                    </div>
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to create this production?", next: handleCreateProduction })}
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
                <TableCell>Status</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Download</TableCell>
                <TableCell>Action</TableCell>
            </TableRowHead>
            {productionList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.process_date ?? data.submit_date}</TableCell>
                    <TableCell>
                        <PDFDownloadLink document={<MaterialRequisitionDoc productionId={data.id} />} fileName={`Material-Requisition-${data.id}.pdf`}>
                            {({ blob, url, loading, error }) => <Button
                                size="md"
                                color="yellow"
                            >
                                Material Requisition
                            </Button>}
                        </PDFDownloadLink>
                    </TableCell>
                    <TableCell>
                        <Button
                            onClick={() => {
                                setIsModalDetailOpen(true)
                                const newDetailMaterial = data.material.map((data) => {
                                    return {
                                        ...data,
                                        stock: stockList.filter((data2) => data2.id === data.inventory_id)[0].stock,
                                        is_valid: data.quantity <= stockList.filter((data2) => data2.id === data.inventory_id)[0].stock
                                    }
                                })
                                setDetailProductionList({
                                    material: newDetailMaterial,
                                    product: data.product
                                })
                                setCurrentStatus(data.status)
                                setCancelProductionReq({
                                    production_id: data.id
                                })
                                setRejectProductionReq({
                                    production_id: data.id
                                })
                                setProcessProductionReq({
                                    is_valid: !(newDetailMaterial.some((data) => data.is_valid === false)),
                                    production_id: data.id,
                                    material: newDetailMaterial
                                })
                                setDoneProductionReq({
                                    production_id: data.id,
                                    product: data.product
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
            title="Detail Production"
        >
            <div className="grid grid-flow-col gap-x-4">
                <div>
                    <Table>
                        <TableRowHead>
                            <TableCell>#</TableCell>
                            <TableCell>Material Name</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Quantity</TableCell>
                            {currentSession.role === BasicConstant.ROLE_GUDANG && currentStatus === BasicConstant.STATUS_SUBMITTED ?
                                <TableCell>Stock</TableCell>
                                : <></>}
                        </TableRowHead>
                        {detailProductionList.material.map((data, index) => {
                            return <TableRow key={index} className={currentSession.role === BasicConstant.ROLE_GUDANG && currentStatus === BasicConstant.STATUS_SUBMITTED && !data.is_valid ? "text-red-500" : "text-black"}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.item_name}</TableCell>
                                <TableCell>{data.unit}</TableCell>
                                <TableCell>{data.quantity}</TableCell>
                                {currentSession.role === BasicConstant.ROLE_GUDANG && currentStatus === BasicConstant.STATUS_SUBMITTED ?
                                    <TableCell>{data.stock}</TableCell>
                                    : <></>}
                            </TableRow>
                        })}
                    </Table>
                </div>
                <div>
                    <Table>
                        <TableRowHead>
                            <TableCell>#</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRowHead>
                        {detailProductionList.product.map((data, index) => {
                            return <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.item_name}</TableCell>
                                <TableCell>{data.unit}</TableCell>
                                <TableCell>{data.quantity}</TableCell>
                            </TableRow>
                        })}
                    </Table>
                </div>
            </div>
            <div
                className="flex justify-center gap-2"
            >
                {currentSession.role === BasicConstant.ROLE_PRODUKSI && currentStatus === BasicConstant.STATUS_SUBMITTED ?
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to cancel this production?", next: handleCancelProduction })}
                        size="md"
                        color="red"
                    >
                        Cancel
                    </Button> : <></>}
                {currentSession.role === BasicConstant.ROLE_GUDANG && currentStatus === BasicConstant.STATUS_SUBMITTED ?
                    <>
                        <Button
                            onClick={() => setConfirm({ message: "Are you sure to reject this production?", next: handleRejectProduction })}
                            size="md"
                            color="red"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={() => processProductionReq.is_valid ? setConfirm({ message: "Are you sure to process this production?", next: handleProcessProduction }) : {}}
                            size="md"
                            color={processProductionReq.is_valid ? "green" : "gray"}
                        >
                            Process
                        </Button>
                    </> : <></>}
                {currentSession.role === BasicConstant.ROLE_PRODUKSI && currentStatus === BasicConstant.STATUS_PROCESS ?
                    <Button
                        onClick={() => setConfirm({ message: "Are you sure to done this production?", next: handleDoneProduction })}
                        size="md"
                        color="green"
                    >
                        Done
                    </Button> : <></>}
            </div>
        </Modal>
    </>
}