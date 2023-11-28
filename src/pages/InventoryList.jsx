import { Document, PDFDownloadLink, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import moment from "moment"
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

export default function InventoryList() {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const currentSession = useCaseFactory.currentSession().get()
    const [inventoryList, setInventoryList] = useState([])
    const [inventoryItemList, setInventoryItemList] = useState([])
    const [selectedInventoryItemList, setSelectedInventoryItemList] = useState([])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [createInventoryReq, setCreateInventoryReq] = useState({
        item_name: "",
        description: "",
        unit: "",
        tipe: "",
        price: ""
    })
    const [updateInventoryReq, setUpdateInventoryReq] = useState({
        id: "",
        item_name: "",
        description: "",
        unit: "",
        tipe: "",
        price: ""
    })
    const [deleteInventoryReq, setDeleteInventoryReq] = useState({
        id: "",
        item_name: ""
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
                            setInventoryList(response.output_schema)
                        }
                    }
                })
            useCaseFactory.getInventoryItemList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            setInventoryItemList(response.output_schema)
                        }
                    }
                })
        }
    }, [isStatic, useCaseFactory])

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

    const validateCreateInventoryReq = () => {
        return !(createInventoryReq.description === "" ||
            createInventoryReq.item_name === "" ||
            createInventoryReq.price === "" ||
            createInventoryReq.tipe === "" ||
            createInventoryReq.unit === "")
    }

    const handleCreateInventoryReq = () => {
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
                            description: "",
                            item_name: "",
                            price: "",
                            unit: ""
                        })
                        getInventoryList()
                    }
                }
            })
    }

    const validateUpdateInventoryReq = () => {
        return !(updateInventoryReq.description === "" ||
            updateInventoryReq.id === "" ||
            updateInventoryReq.item_name === "" ||
            updateInventoryReq.price === "" ||
            updateInventoryReq.tipe === "" ||
            updateInventoryReq.unit === "")
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
                        getInventoryList()
                    }
                }
            })
    }

    const InventoryStatusReportDoc = () => {
        const result = inventoryList.filter((data) => data.tipe === BasicConstant.INVENTORY_PRODUK)

        return <Document>
            <Page size={"A4"} style={styles.page}>
                <View style={styles.section}>
                    <Text style={{ ...styles.bold, textAlign: "center", fontSize: 16 }}>Inventory Status Report</Text>
                    <div style={{ marginBottom: 5 }} />
                    <Text style={{ ...styles.bold, textAlign: "center", fontSize: 12 }}>{moment().format("DD/MM/YYYY HH:mm:ss")}</Text>
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
                            <Text>Stock</Text>
                        </div>
                    </div>
                    {result.map((data, index) => {
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
                                <Text>{data.stock}</Text>
                            </div>
                        </div>
                    })}
                    <Text style={{ ...styles.bold, fontSize: 10, position: "absolute", right: 0, bottom: 0 }}>eSCM PT Rajawali</Text>
                </View>
            </Page>
        </Document>
    }

    return <>
        <TitlePage>Inventory List</TitlePage>
        {currentSession.role === BasicConstant.ROLE_ADMIN ?
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
                    <Select
                        value={createInventoryReq.tipe}
                        onChange={(e) => setCreateInventoryReq({
                            ...createInventoryReq,
                            tipe: e.target.value
                        })}
                    >
                        <SelectOption value="">Tipe</SelectOption>
                        <SelectOption value={BasicConstant.INVENTORY_PRODUK}>{BasicConstant.INVENTORY_PRODUK}</SelectOption>
                        <SelectOption value={BasicConstant.INVENTORY_BAHAN}>{BasicConstant.INVENTORY_BAHAN}</SelectOption>
                    </Select>
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
                        onClick={() => validateCreateInventoryReq() ? setConfirm({ message: "Are you sure to create this inventory?", next: handleCreateInventoryReq }) : {}}
                        size="md"
                        color="blue"
                    >
                        Add
                    </Button>
                </Modal>
            </> : <></>}
        {currentSession.role === BasicConstant.ROLE_DISTRIBUSI ?
            <PDFDownloadLink document={<InventoryStatusReportDoc />} fileName={`Inventory-Status-Report.pdf`}>
                {({ blob, url, loading, error }) => <Button
                    size="md"
                    color="yellow"
                    className="mb-2"
                >
                    Inventory Status Report
                </Button>}
            </PDFDownloadLink> : <></>}
        <Table>
            <TableRowHead>
                <TableCell>#</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Tipe</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Action</TableCell>
            </TableRowHead>
            {inventoryList.filter((data) => currentSession.role === BasicConstant.ROLE_DISTRIBUSI ? data.tipe === BasicConstant.INVENTORY_PRODUK : true).map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.item_name}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.unit}</TableCell>
                    <TableCell>{data.tipe}</TableCell>
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
                        {currentSession.role === BasicConstant.ROLE_ADMIN ?
                            <>
                                <Button
                                    onClick={() => {
                                        setIsModalUpdateOpen(true)
                                        setUpdateInventoryReq({
                                            id: data.id,
                                            item_name: data.item_name,
                                            description: data.description,
                                            unit: data.unit,
                                            tipe: data.tipe,
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
                                        setConfirm({ message: "Are you sure to delete this inventory?", next: handleDeleteInventory })
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
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                </TableRowHead>
                {selectedInventoryItemList.map((data, index) => {
                    return <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.quantity}</TableCell>
                        <TableCell>{data.description}</TableCell>
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
                readOnly={true}
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
            <Select
                value={updateInventoryReq.tipe}
                onChange={(e) => setUpdateInventoryReq({
                    ...updateInventoryReq,
                    tipe: e.target.value
                })}
            >
                <SelectOption value="">Tipe</SelectOption>
                <SelectOption value={BasicConstant.INVENTORY_PRODUK}>{BasicConstant.INVENTORY_PRODUK}</SelectOption>
                <SelectOption value={BasicConstant.INVENTORY_BAHAN}>{BasicConstant.INVENTORY_BAHAN}</SelectOption>
            </Select>
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
                onClick={() => validateUpdateInventoryReq() ? setConfirm({ message: "Are you sure to update this inventory?", next: handleUpdateInventory }) : {}}
                size="md"
                color="yellow"
            >
                Update
            </Button>
        </Modal>
    </>
}