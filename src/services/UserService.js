import axios from "axios"
import { from, map, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { noJwtConfig } from "./BaseConfig"

export class UserService {
    endpoint = process.env.REACT_APP_ENDPOINT + "/user"

    login(loginReq) {
        return from(axios.post(this.endpoint + "/login", loginReq, noJwtConfig))
        .pipe(
            map((response) => response.data),
            catchError((error) => {
                return of(error.response.data)
            })
        )
    }
}