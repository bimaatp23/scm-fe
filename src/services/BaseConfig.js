import { SessionUseCase } from "../UseCaseFactory"
import jsrsasign from "jsrsasign"

export class BaseConfig {
    sessionUseCase = new SessionUseCase()

    noJwtConfig = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    jwtConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + jsrsasign.jws.JWS.sign(null, { alg: 'HS256' }, this.sessionUseCase.get(), process.env.REACT_APP_SECRET_KEY)
        }
    }
}
