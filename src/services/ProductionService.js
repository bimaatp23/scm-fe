import axios from "axios"
import moment from "moment"
import { from, map, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { TimeUseCase } from "../UseCaseFactory"
import { setNotification } from "../Utils"
import { BaseConfig } from "./BaseConfig"

export class ProductionService {
    baseConfig = new BaseConfig()
    timeUseCase = new TimeUseCase()

    endpoint = process.env.REACT_APP_ENDPOINT + "/production"

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

    create(createProductionReq) {
        return from(axios.post(this.endpoint + "/create", {
            production_id: this.timeUseCase.get().getTime(),
            submit_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss"),
            material: JSON.stringify(createProductionReq.material.filter((data) => data.quantity > 0)),
            product: JSON.stringify(createProductionReq.product.filter((data) => data.quantity > 0))
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

    cancel(cancelProductionReq) {
        return from(axios.post(this.endpoint + "/cancel", {
            production_id: cancelProductionReq.production_id,
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
}