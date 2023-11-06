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

    create(createOrderReq) {
        return from(axios.post(this.endpoint + "/create", {
            order_id: this.timeUseCase.get().getTime(),
            user_retail: this.sessionUseCase.get().username,
            total: createOrderReq.total,
            submitted_date: moment(this.timeUseCase.get()).format("YYYY-MM-DD HH:mm:ss"),
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
}