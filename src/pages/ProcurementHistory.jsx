import { useEffect, useMemo, useState } from "react"
import BasicConstant from "../BasicConstant"
import { UseCaseFactory } from "../UseCaseFactory"
import { toRupiah } from "../Utils"
import Button from "../components/Button"
import Modal from "../components/Modal"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"

export default function ProcurementHistory() {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const currentSession = useMemo(() => useCaseFactory.currentSession().get(), [useCaseFactory])
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
    const [procurementList, setProcurementList] = useState([])
    const [detailProcurementList, setDetailProcurementList] = useState({
        total: 0,
        data: []
    })

    const [isStatic, setIsStatic] = useState(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            useCaseFactory.getProcurementList().execute()
                .subscribe({
                    next: (response) => {
                        const allowedStatus = [
                            BasicConstant.STATUS_CANCELLED,
                            BasicConstant.STATUS_REJECTED,
                            BasicConstant.STATUS_DONE
                        ]
                        const allowedStatus2 = [
                            BasicConstant.STATUS_REJECTED,
                            BasicConstant.STATUS_DONE
                        ]
                        if (response.error_schema.error_code === 200) {
                            if (currentSession.role === BasicConstant.ROLE_SUPPLIER) {
                                setProcurementList(response.output_schema.filter((data) => allowedStatus.includes(data.status) && data.user_supplier === currentSession.username))
                            } else {
                                setProcurementList(response.output_schema.filter((data) => allowedStatus2.includes(data.status)))
                            }
                        }
                    }
                })
        }
    }, [isStatic, useCaseFactory, currentSession])

    return <>
        <TitlePage>Procurement History</TitlePage>
        <Table>
            <TableRowHead>
                <TableCell>#</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update Date</TableCell>
                {currentSession.role !== BasicConstant.ROLE_SUPPLIER ?
                    <TableCell>Order To</TableCell>
                    : <></>}
                <TableCell>Action</TableCell>
            </TableRowHead>
            {procurementList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{toRupiah(parseInt(data.total))}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.done_date ?? data.reject_date ?? data.cancel_date}</TableCell>
                    {currentSession.role !== BasicConstant.ROLE_SUPPLIER ?
                        <TableCell>{data.user_supplier}</TableCell>
                        : <></>}
                    <TableCell>
                        <Button
                            onClick={() => {
                                setIsModalDetailOpen(true)
                                setDetailProcurementList({
                                    total: parseInt(data.total),
                                    data: data.items
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
                {detailProcurementList.data.map((data, index) => {
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
                    <TableCell>{toRupiah(detailProcurementList.total)}</TableCell>
                </TableRow>
            </Table>
        </Modal>
    </>
}