import axios from "axios"
import moment from "moment"
import { from, map, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { SessionUseCase, TimeUseCase } from "../UseCaseFactory"
import { setNotification } from "../Utils"
import { BaseConfig } from "./BaseConfig"

export class OrderService {
    baseConfig = new BaseConfig()
    sessionUseCase = new SessionUseCase()
    timeUseCase = new TimeUseCase()

    endpoint = process.env.REACT_APP_ENDPOINT + "/order"

    getList() {
        return from(axios.get(this.endpoint + "/list", this.baseConfig.jwtConfig))
            .pipe(
                map((response) => {
                    return response.data
                }),
                catchError((error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.error_schema.error_message
                    })
                    return of(error.response.data)
                })
            )
    }

    create(createOrderReq) {
        return from(axios.post(this.endpoint + "/create", {
            order_id: this.timeUseCase.get().getTime(),
            user_retail: this.sessionUseCase.get().username,
            total: createOrderReq.total,
            submit_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss"),
            data: JSON.stringify(createOrderReq.data.filter((data) => data.quantity > 0))
        }, this.baseConfig.jwtConfig))
            .pipe(
                map((response) => {
                    return response.data
                }),
                catchError((error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.error_schema.error_message
                    })
                    return of(error.response.data)
                })
            )
    }

    cancel(cancelOrderReq) {
        return from(axios.post(this.endpoint + "/cancel", {
            order_id: cancelOrderReq.order_id,
            cancel_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss")
        }, this.baseConfig.jwtConfig))
            .pipe(
                map((response) => {
                    return response.data
                }),
                catchError((error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.error_schema.error_message
                    })
                    return of(error.response.data)
                })
            )
    }

    reject(rejectOrderReq) {
        return from(axios.post(this.endpoint + "/reject", {
            order_id: rejectOrderReq.order_id,
            reject_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss")
        }, this.baseConfig.jwtConfig))
            .pipe(
                map((response) => {
                    return response.data
                }),
                catchError((error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.error_schema.error_message
                    })
                    return of(error.response.data)
                })
            )
    }

    process(processOrderReq) {
        return from(axios.post(this.endpoint + "/process", {
            order_id: processOrderReq.order_id,
            process_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss"),
            data: JSON.stringify(processOrderReq.data.filter((data) => data.quantity > 0))
        }, this.baseConfig.jwtConfig))
            .pipe(
                map((response) => {
                    return response.data
                }),
                catchError((error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.error_schema.error_message
                    })
                    return of(error.response.data)
                })
            )
    }

    delivery(deliveryOrderReq) {
        return from(axios.post(this.endpoint + "/delivery", {
            order_id: deliveryOrderReq.order_id,
            delivery_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss")
        }, this.baseConfig.jwtConfig))
            .pipe(
                map((response) => {
                    return response.data
                }),
                catchError((error) => {
                    setNotification({
                        icon: "error",
                        message: error.response.data.error_schema.error_message
                    })
                    return of(error.response.data)
                })
            )
    }
}