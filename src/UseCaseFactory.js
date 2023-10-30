import { UserService } from "./services/UserService"

// User Service

export class LoginUseCase {
    execute(loginReq) {
        return new UserService().login(loginReq)
    }
}

export class UseCaseFactory {
    // User Service
    userLogin() { return new LoginUseCase() }
}