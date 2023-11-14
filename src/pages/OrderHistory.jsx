import { useEffect, useMemo, useState } from "react"
import { UseCaseFactory } from "../UseCaseFactory"
import { toRupiah } from "../Utils"
import Button from "../components/Button"
import Modal from "../components/Modal"
import { Table, TableCell, TableRow, TableRowHead } from "../components/Table"
import TitlePage from "../components/TitlePage"

export default function OrderHistory() {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false)
    const [orderList, setOrderList] = useState([])
    const [detailOrderList, setDetailOrderList] = useState({
        total: 0,
        data: []
    })

    const [isStatic, setIsStatic] = useState(false)
    useEffect(() => setIsStatic(true), [])

    useEffect(() => {
        if (isStatic) {
            useCaseFactory.getOrderList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            setOrderList(response.output_schema.filter((data) => data.status === "Rejected"))
                        }
                    }
                })
        }
    }, [isStatic, useCaseFactory])

    return <>
        <TitlePage>Order History</TitlePage>
        <Table>
            <TableRowHead>
                <TableCell>#</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Ordered By</TableCell>
                <TableCell>Action</TableCell>
            </TableRowHead>
            {orderList.map((data, index) => {
                return <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{toRupiah(parseInt(data.total))}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.reject_date ?? data.submit_date}</TableCell>
                    <TableCell>{data.user_retail}</TableCell>
                    <TableCell>
                        <Button
                            onClick={() => {
                                setIsModalDetailOpen(true)
                                setDetailOrderList({
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