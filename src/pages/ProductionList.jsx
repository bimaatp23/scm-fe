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
    const [createProductionReq, setCreateProductionReq] = useState({
        material: [],
        product: []
    })

    const [isStatic, setIsStatic] = useState(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            useCaseFactory.getInventoryList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
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
        }
    }, [isStatic, useCaseFactory, currentSession])

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
                    }
                }
            })
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
    </>
}