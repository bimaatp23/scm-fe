import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js"
import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import { Bar } from "react-chartjs-2"
import BasicConstant from "../BasicConstant"
import { UseCaseFactory } from "../UseCaseFactory"
import TitlePage from "../components/TitlePage"

Chart.register(CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip)

export default function Dashboard() {
    const useCaseFactory = useMemo(() => new UseCaseFactory(), [])
    const currentSession = useMemo(() => useCaseFactory.currentSession().get(), [useCaseFactory])
    const allowedRole = useMemo(() => [
        BasicConstant.ROLE_ADMIN,
        BasicConstant.ROLE_PENGADAAN,
        BasicConstant.ROLE_GUDANG,
        BasicConstant.ROLE_PRODUKSI,
        BasicConstant.ROLE_DISTRIBUSI
    ], [])
    const [orderHistory, setOrderHistory] = useState([])
    const backgroundColor = [
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(255, 205, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(153, 102, 255, 0.5)"
    ]
    const borderColor = [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)"
    ]

    const randomGenerator = () => {
        const result = []
        const usedNumbers = new Set()
        while (result.length < 3) {
            const randomNumber = Math.floor(Math.random() * (4 + 1))
            if (!usedNumbers.has(randomNumber)) {
                result.push(randomNumber)
                usedNumbers.add(randomNumber)
            }
        }
        return result
    }

    const randomColor = randomGenerator()

    useEffect(() => {
        if (allowedRole.includes(currentSession.role)) {
            useCaseFactory.getOrderList().execute()
                .subscribe({
                    next: (response) => {
                        if (response.error_schema.error_code === 200) {
                            // Range 3 Month
                            const currentDate = new Date()
                            currentDate.setDate(1)
                            const startDate = new Date()
                            const endDate = new Date()
                            startDate.setMonth(currentDate.getMonth() - 3)
                            startDate.setDate(1)
                            endDate.setDate(currentDate.getDate() - 1)
                            const newOrderList = response.output_schema
                                .filter((data) => data.status === BasicConstant.STATUS_DONE)
                                .filter((data) => new Date(data.submit_date) >= startDate && new Date(data.submit_date) <= endDate)
                                .map((data) => {
                                    return {
                                        ...data,
                                        order_date: moment(new Date(data.submit_date)).format("MMMM YYYY")
                                    }
                                })
                            const newOrderHistory = newOrderList
                                .map((data) => data.order_date)
                                .filter((value, index, self) => self.indexOf(value) === index)
                                .map((data) => {
                                    let newData = []
                                    newOrderList
                                        .filter((data2) => data2.order_date === data)
                                        .map((data2) => newData.push(...data2.items))
                                    return {
                                        month: data,
                                        data: newData
                                            .map((data2) => {
                                                return {
                                                    inventory_id: data2.inventory_id,
                                                    item_name: data2.item_name,
                                                    quantity: parseInt(data2.quantity)
                                                }
                                            })
                                            .reduce((accumulator, currentValue) => {
                                                const existingItem = accumulator.find(item => item.inventory_id === currentValue.inventory_id)
                                                if (existingItem) {
                                                    existingItem.quantity += currentValue.quantity
                                                } else {
                                                    accumulator.push({
                                                        inventory_id: currentValue.inventory_id,
                                                        item_name: currentValue.item_name,
                                                        quantity: currentValue.quantity
                                                    })
                                                }
                                                return accumulator
                                            }, [])
                                    }
                                })
                            setOrderHistory(newOrderHistory)
                        }
                    }
                })
        }
    }, [useCaseFactory, allowedRole, currentSession])

    return (
        <div>
            <TitlePage>Dashboard</TitlePage>
            {allowedRole.includes(currentSession.role) ? <div className="w-full h-96 bg-slate-50 rounded-2xl py-2 px-3 mb-4">
                <Bar data={{
                    labels: orderHistory[0]?.data.map((data) => data.item_name),
                    datasets: orderHistory?.map((data, index) => {
                        return {
                            label: data.month,
                            data: data.data.map((data2) => data2.quantity),
                            backgroundColor: [backgroundColor[randomColor[index]]],
                            borderColor: [borderColor[randomColor[index]]],
                            borderWidth: 1
                        }
                    })
                }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: "Order History"
                            },
                            legend: {
                                display: true
                            },
                            tooltip: {
                                enabled: true
                            }
                        }
                    }}
                />
            </div> : <></>}
            <div className="w-80 max-w-full bg-slate-50 rounded-2xl py-5 px-4">
                <div className="text-xl font-bold mb-4 text-center">
                    Profile
                </div>
                <div className="grid grid-cols-3 font-semibold">
                    <div className="mr-3">
                        <p>Name</p>
                        <p>Username</p>
                        <p>Role</p>
                    </div>
                    <div className="col-span-2">
                        <p>: {currentSession.name}</p>
                        <p>: {currentSession.username}</p>
                        <p>: {currentSession.role}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}