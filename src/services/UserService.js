import axios from "axios"
import { from, map, of } from "rxjs"
import { catchError } from "rxjs/operators"
import { SessionUseCase } from "../UseCaseFactory"
import { setNotification } from "../Utils"
import { BaseConfig } from "./BaseConfig"

export class UserService {
    baseConfig = new BaseConfig()
    sessionUseCase = new SessionUseCase()

    endpoint = process.env.REACT_APP_ENDPOINT + "/user"

    login(loginReq) {
        return from(axios.post(this.endpoint + "/login", loginReq, this.baseConfig.noJwtConfig))
            .pipe(
                map((response) => {
                    this.sessionUseCase.set(response.data.output_schema)
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

    create(createUserReq) {
        return from(axios.post(this.endpoint + "/create", createUserReq, this.baseConfig.jwtConfig))
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

    update(updateUserReq) {
        return from(axios.post(this.endpoint + "/update", updateUserReq, this.baseConfig.jwtConfig))
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

    delete(deleteUserReq) {
        return from(axios.post(this.endpoint + "/delete", deleteUserReq, this.baseConfig.jwtConfig))
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

    changePassword(deleteUserReq) {
        return from(axios.post(this.endpoint + "/change-password", deleteUserReq, this.baseConfig.jwtConfig))
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

    createRetail(createRetailReq) {
        return from(axios.post(this.endpoint + "/create-retail", createRetailReq, this.baseConfig.noJwtConfig))
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