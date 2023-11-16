import { InventoryService } from "./services/InventoryService"
import { OrderService } from "./services/OrderService"
import { UserService } from "./services/UserService"

// Time Use Case

export class TimeUseCase {
    // returnDate
    get() {
        const customDate = ""
        const currentDate = new Date()
        if (customDate !== "") {
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
        return new UserService().create(createUserReq)
    }
}

export class UpdateUserUseCase {
    execute(updateUserReq) {
        return new UserService().update(updateUserReq)
    }
}

export class DeleteUserUseCase {
    execute(deleteUserReq) {
        return new UserService().delete(deleteUserReq)
    }
}

export class ChangePasswordUseCase {
    execute(changePasswordReq) {
        return new UserService().changePassword(changePasswordReq)
    }
}

export class CreateRetailUseCase {
    execute(createRetailReq) {
        return new UserService().createRetail(createRetailReq)
    }
}

// Inventory Use Case
export class GetInventoryListUseCase {
    execute() {
        return new InventoryService().getList()
    }
}

export class GetInventoryItemListUseCase {
    execute() {
        return new InventoryService().getItemList()
    }
}

export class CreateInventoryUseCase {
    execute(createInventoryReq) {
        return new InventoryService().create(createInventoryReq)
    }
}

export class UpdateInventoryUseCase {
    execute(updateInventoryReq) {
        return new InventoryService().update(updateInventoryReq)
    }
}

export class DeleteInventoryUseCase {
    execute(deleteInventoryReq) {
        return new InventoryService().delete(deleteInventoryReq)
    }
}

// Order Use Case

export class GetOrderListUseCase {
    execute() {
        return new OrderService().getList()
    }
}

export class CreateOrderUseCase {
    execute(createOrderReq) {
        return new OrderService().create(createOrderReq)
    }
}

export class CancelOrderUseCase {
    execute(cancelOrderReq) {
        return new OrderService().cancel(cancelOrderReq)
    }
}

export class RejectOrderUseCase {
    execute(rejectOrderReq) {
        return new OrderService().reject(rejectOrderReq)
    }
}

export class ProcessOrderUseCase {
    execute(processOrderReq) {
        return new OrderService().process(processOrderReq)
    }
}

export class DeliveryOrderUseCase {
    execute(deliveryOrderReq) {
        return new OrderService().delivery(deliveryOrderReq)
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
    changePassword() { return new ChangePasswordUseCase() }
    createRetail() { return new CreateRetailUseCase() }
    // Inventory Use Case
    getInventoryList() { return new GetInventoryListUseCase() }
    getInventoryItemList() { return new GetInventoryItemListUseCase() }
    createInventory() { return new CreateInventoryUseCase() }
    updateInventory() { return new UpdateInventoryUseCase() }
    deleteInventory() { return new DeleteInventoryUseCase() }
    // Order Use Case
    getOrderList() { return new GetOrderListUseCase() }
    createOrder() { return new CreateOrderUseCase() }
    cancelOrder() { return new CancelOrderUseCase() }
    rejectOrder() { return new RejectOrderUseCase() }
    processOrder() { return new ProcessOrderUseCase() }
    deliveryOrder() { return new DeliveryOrderUseCase() }
}