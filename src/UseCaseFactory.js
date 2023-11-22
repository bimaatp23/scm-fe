import { of } from "rxjs"
import { setNotification } from "./Utils"
import { InventoryService } from "./services/InventoryService"
import { OrderService } from "./services/OrderService"
import { ProductionService } from "./services/ProductionService"
import { UserService } from "./services/UserService"

// Validate Base Resp

export class BaseResp {
    emptyData() {
        const response = {
            error_schema: {
                error_code: 400,
                error_message: "Data can't be NULL"
            }
        }
        setNotification({
            icon: "error",
            message: response.error_schema.error_message
        })
        return of(response)
    }
}

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

// Production Use case

export class GetProductionListUseCase {
    execute() {
        return new ProductionService().getList()
    }
}
export class CreateProductionUseCase {
    validate(createProductionReq) {
        let validateCount = 0
        if (createProductionReq.material.length === 0) {
            validateCount += 1
        }
        if (createProductionReq.product.length === 0) {
            validateCount += 1
        }
        return validateCount
    }

    execute(createProductionReq) {
        const newCreateProductionReq = {
            material: createProductionReq.material.filter((data) => data.quantity > 0),
            product: createProductionReq.product.filter((data) => data.quantity > 0)
        }
        if (this.validate(newCreateProductionReq) === 0) {
            return new ProductionService().create(newCreateProductionReq)
        } else {
            return new BaseResp().emptyData()
        }
    }
}

// Order Use Case

export class GetOrderListUseCase {
    execute() {
        return new OrderService().getList()
    }
}

export class CreateOrderUseCase {
    validate(createOrderReq) {
        let validateCount = 0
        if (createOrderReq.data.length === 0) {
            validateCount += 1
        }
        return validateCount
    }

    execute(createOrderReq) {
        const newCreateOrderReq = {
            total: createOrderReq.total,
            data: createOrderReq.data.filter((data) => data.quantity > 0)
        }
        if (this.validate(newCreateOrderReq) === 0) {
            return new OrderService().create(newCreateOrderReq)
        } else {
            return new BaseResp().emptyData()
        }
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

export class ArrivalOrderUseCase {
    execute(arrivalOrderReq) {
        return new OrderService().arrival(arrivalOrderReq)
    }
}

export class DoneOrderUseCase {
    execute(doneOrderReq) {
        return new OrderService().done(doneOrderReq)
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
    // Production Use Case
    getProductionList() { return new GetProductionListUseCase() }
    createProduction() { return new CreateProductionUseCase() }
    // Order Use Case
    getOrderList() { return new GetOrderListUseCase() }
    createOrder() { return new CreateOrderUseCase() }
    cancelOrder() { return new CancelOrderUseCase() }
    rejectOrder() { return new RejectOrderUseCase() }
    processOrder() { return new ProcessOrderUseCase() }
    deliveryOrder() { return new DeliveryOrderUseCase() }
    arrivalOrder() { return new ArrivalOrderUseCase() }
    doneOrder() { return new DoneOrderUseCase() }
}