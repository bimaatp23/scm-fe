import axios from "axios"
import moment from "moment"
import { from, map, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { SessionUseCase, TimeUseCase } from "../UseCaseFactory"
import { setNotification } from "../Utils"
import { BaseConfig } from "./BaseConfig"

export class ProcurementService {
    baseConfig = new BaseConfig()
    sessionUseCase = new SessionUseCase()
    timeUseCase = new TimeUseCase()

    endpoint = process.env.REACT_APP_ENDPOINT + "/procurement"

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

    create(createProcurementReq) {
        return from(axios.post(this.endpoint + "/create", {
            procurement_id: this.timeUseCase.get().getTime(),
            user_supplier: createProcurementReq.user_supplier,
            total: createProcurementReq.total,
            submit_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss"),
            data: JSON.stringify(createProcurementReq.data)
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

    cancel(cancelProcurementReq) {
        return from(axios.post(this.endpoint + "/cancel", {
            procurement_id: cancelProcurementReq.procurement_id,
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

    reject(rejectProcurementReq) {
        return from(axios.post(this.endpoint + "/reject", {
            procurement_id: rejectProcurementReq.procurement_id,
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

    process(processProcurementReq) {
        return from(axios.post(this.endpoint + "/process", {
            procurement_id: processProcurementReq.procurement_id,
            process_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss")
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

    delivery(deliveryProcurementReq) {
        return from(axios.post(this.endpoint + "/delivery", {
            procurement_id: deliveryProcurementReq.procurement_id,
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

    arrival(arrivalProcurementReq) {
        return from(axios.post(this.endpoint + "/arrival", {
            procurement_id: arrivalProcurementReq.procurement_id,
            arrival_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss"),
            data: JSON.stringify(arrivalProcurementReq.data)
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

    done(doneProcurementReq) {
        return from(axios.post(this.endpoint + "/done", {
            procurement_id: doneProcurementReq.procurement_id,
            done_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss")
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