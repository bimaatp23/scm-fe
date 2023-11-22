import { useEffect, useMemo, useState } from "react"
import BasicConstant from "../BasicConstant"
import { UseCaseFactory } from "../UseCaseFactory"
import Button from "../components/Button"
import Modal from "../components/Modal"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"

export default function ProductionHistory() {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const currentSession = useMemo(() => useCaseFactory.currentSession().get(), [useCaseFactory])
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
    const [productionList, setProductionList] = useState([])
    const [detailProductionList, setDetailProductionList] = useState({
        material: [],
        product: []
    })

    const [isStatic, setIsStatic] = useState(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            useCaseFactory.getProductionList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            const allowedStatus = [
                                BasicConstant.STATUS_CANCELLED,
                                BasicConstant.STATUS_REJECTED,
                                BasicConstant.STATUS_DONE
                            ]
                            const allowedStatus2 = [
                                BasicConstant.STATUS_REJECTED,
                                BasicConstant.STATUS_DONE
                            ]
                            if (currentSession.role === BasicConstant.ROLE_PRODUKSI) {
                                setProductionList(response.output_schema.filter((data) => allowedStatus.includes(data.status)))
                            } else {
                                setProductionList(response.output_schema.filter((data) => allowedStatus2.includes(data.status)))
                            }
                        }
                    }
                })
        }
    }, [isStatic, useCaseFactory, currentSession])

    return <>
        <TitlePage>Production History</TitlePage>
        <Table>
            <TableRowHead>
                <TableCell>#</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
            </TableRowHead>
            {productionList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.done_date ?? data.reject_date ?? data.cancel_date}</TableCell>
                    <TableCell>
                        <Button
                            onClick={() => {
                                setDetailProductionList({
                                    material: data.material,
                                    product: data.product
                                })
                                setIsModalDetailOpen(true)
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
                        </TableRowHead>
                        {detailProductionList.material.map((data, index) => {
                            return <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.item_name}</TableCell>
                                <TableCell>{data.unit}</TableCell>
                                <TableCell>{data.quantity}</TableCell>
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
        </Modal>
    </>
}