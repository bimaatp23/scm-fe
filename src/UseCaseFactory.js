import { UserService } from "./services/UserService"

// Time Use Case

export class TimeUseCase {
    // returnDate
    get() {
        const customDate = ""
        const currentDate = new Date()
        if (customDate != "") {
            currentDate.setFullYear(customDate.split("-")[0])
            currentDate.setMonth(customDate.split("-")[1] - 1)
            currentDate.setDate(customDate.split("-")[2])
        }
        return currentDate
    }
}

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

export class CreateUserUseCase {
    execute(createUserReq) {
        return new UserService().createUser(createUserReq)
    }
}

export class UpdateUserUseCase {
    execute(updateUserReq) {
        return new UserService().updateUser(updateUserReq)
    }
}

export class DeleteUserUseCase {
    execute(deleteUserReq) {
        return new UserService().deleteUser(deleteUserReq)
    }
}

export class UseCaseFactory {
    // Time Use Case
    currentTime() { return new TimeUseCase() }
    // Session Use Case
    currentSession() { return new SessionUseCase() }
    // User Use Case
    login() { return new LoginUseCase() }
    getUserList() { return new GetUserListUseCase() }
    createUser() { return new CreateUserUseCase() }
    updateUser() { return new UpdateUserUseCase() }
    deleteUser() { return new DeleteUserUseCase() }
}