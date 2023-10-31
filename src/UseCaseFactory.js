import { UserService } from "./services/UserService"

// Session Use Case

export class SessionUseCase {
    get() {
        return {
            name: localStorage.getItem("name"),
            username: localStorage.getItem("username"),
            role: localStorage.getItem("role")
        }
    }
    set(payload) {
        localStorage.setItem("name", payload.name)
        localStorage.setItem("username", payload.username)
        localStorage.setItem("role", payload.role)
    }
    clear() {
        localStorage.removeItem("name")
        localStorage.removeItem("username")
        localStorage.removeItem("role")
    }
}

// User Use Case

export class LoginUseCase {
    execute(loginReq) {
        return new UserService().login(loginReq)
    }
}

export class GetUserListUseCase {
    execute() {
        return new UserService().getList()
    }
}

export class UseCaseFactory {
    // Session Use Case
    current() { return new SessionUseCase() }
    // User Use Case
    login() { return new LoginUseCase() }
    getUserList() { return new GetUserListUseCase() }
}