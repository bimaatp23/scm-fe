import axios from "axios"
import { from, map, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { SessionUseCase } from "../UseCaseFactory"
import { BaseConfig } from "./BaseConfig"

export class InventoryService {
    baseConfig = new BaseConfig()
    sessionUseCase = new SessionUseCase()

    endpoint = process.env.REACT_APP_ENDPOINT + "/inventory"

    getList() {
        return from(axios.get(this.endpoint + "/stock", this.baseConfig.jwtConfig))
            .pipe(
                map((response) => {
                    return response.data
                }),
                catchError((error) => {
                    alert(error.response.data.error_schema.error_message)
                    return of(error.response.data)
                })
            )
    }
}