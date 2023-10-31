import axios from "axios"
import { from, map, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { noJwtConfig } from "./BaseConfig"
import { SessionUseCase } from "../UseCaseFactory"

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
                return of(error.response.data)
            })
        )
    }
}