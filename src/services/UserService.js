import axios from "axios"
import { from, map, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { SessionUseCase } from "../UseCaseFactory"
import { jwtConfig, noJwtConfig } from "./BaseConfig"

export class UserService {
    sessionUseCase = new SessionUseCase()

    endpoint = process.env.REACT_APP_ENDPOINT + "/user"

    login(loginReq) {
        return from(axios.post(this.endpoint + "/login", loginReq, noJwtConfig))
            .pipe(
                map((response) => {
                    this.sessionUseCase.set(response.data.output_schema)
                    return response.data
                }),
                catchError((error) => {
                    alert(error.response.data.error_schema.error_message)
                    return of(error.response.data)
                })
            )
    }

    getList() {
        return from(axios.get(this.endpoint + "/list", jwtConfig))
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