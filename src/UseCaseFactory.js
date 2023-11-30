import { of } from "rxjs"
import { setNotification } from "./Utils"
import { InventoryService } from "./services/InventoryService"
import { OrderService } from "./services/OrderService"
import { ProcurementService } from "./services/ProcurementService"
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

export class CreateSupplierUseCase {
    execute(createSupplierReq) {
        return new UserService().createSupplier(createSupplierReq)
    }
}

export class GetSupplierListUseCase {
    execute() {
        return new UserService().supplierList()
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

export class CancelProductionUseCase {
    execute(cancelProductionReq) {
        return new ProductionService().cancel(cancelProductionReq)
    }
}

export class RejectProductionUseCase {
    execute(rejectProductionReq) {
        return new ProductionService().reject(rejectProductionReq)
    }
}

export class ProcessProductionUseCase {
    execute(processProductionReq) {
        return new ProductionService().process(processProductionReq)
    }
}

export class DoneProductionUseCase {
    execute(doneProductionReq) {
        return new ProductionService().done(doneProductionReq)
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

// Procurement Use Case

export class GetProcurementListUseCase {
    execute() {
        return new ProcurementService().getList()
    }
}

export class CreateProcurementUseCase {
    validate(createProcurementReq) {
        let validateCount = 0
        if (createProcurementReq.data.length === 0) {
            validateCount += 1
        }
        return validateCount
    }

    execute(createProcurementReq) {
        const newCreateProcurementReq = {
            total: createProcurementReq.total,
            user_supplier: createProcurementReq.user_supplier,
            data: createProcurementReq.data.filter((data) => data.quantity > 0)
        }
        if (this.validate(newCreateProcurementReq) === 0) {
            return new ProcurementService().create(newCreateProcurementReq)
        } else {
            return new BaseResp().emptyData()
        }
    }
}

export class CancelProcurementUseCase {
    execute(cancelProcurementReq) {
        return new ProcurementService().cancel(cancelProcurementReq)
    }
}

export class RejectProcurementUseCase {
    execute(rejectProcurementReq) {
        return new ProcurementService().reject(rejectProcurementReq)
    }
}

export class ProcessProcurementUseCase {
    execute(processProcurementReq) {
        return new ProcurementService().process(processProcurementReq)
    }
}

export class DeliveryProcurementUseCase {
    execute(deliveryProcurementReq) {
        return new ProcurementService().delivery(deliveryProcurementReq)
    }
}

export class ArrivalProcurementUseCase {
    execute(arrivalProcurementReq) {
        return new ProcurementService().arrival(arrivalProcurementReq)
    }
}

export class DoneProcurementUseCase {
    execute(doneProcurementReq) {
        return new ProcurementService().done(doneProcurementReq)
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
    createSupplier() { return new CreateSupplierUseCase() }
    getSupplierList() { return new GetSupplierListUseCase() }
    // Inventory Use Case
    getInventoryList() { return new GetInventoryListUseCase() }
    getInventoryItemList() { return new GetInventoryItemListUseCase() }
    createInventory() { return new CreateInventoryUseCase() }
    updateInventory() { return new UpdateInventoryUseCase() }
    deleteInventory() { return new DeleteInventoryUseCase() }
    // Production Use Case
    getProductionList() { return new GetProductionListUseCase() }
    createProduction() { return new CreateProductionUseCase() }
    cancelProduction() { return new CancelProductionUseCase() }
    rejectProduction() { return new RejectProductionUseCase() }
    processProduction() { return new ProcessProductionUseCase() }
    doneProduction() { return new DoneProductionUseCase() }
    // Order Use Case
    getOrderList() { return new GetOrderListUseCase() }
    createOrder() { return new CreateOrderUseCase() }
    cancelOrder() { return new CancelOrderUseCase() }
    rejectOrder() { return new RejectOrderUseCase() }
    processOrder() { return new ProcessOrderUseCase() }
    deliveryOrder() { return new DeliveryOrderUseCase() }
    arrivalOrder() { return new ArrivalOrderUseCase() }
    doneOrder() { return new DoneOrderUseCase() }
    // Procurement Use Case
    getProcurementList() { return new GetProcurementListUseCase() }
    createProcurement() { return new CreateProcurementUseCase() }
    cancelProcurement() { return new CancelProcurementUseCase() }
    rejectProcurement() { return new RejectProcurementUseCase() }
    processProcurement() { return new ProcessProcurementUseCase() }
    deliveryProcurement() { return new DeliveryProcurementUseCase() }
    arrivalProcurement() { return new ArrivalProcurementUseCase() }
    doneProcurement() { return new DoneProcurementUseCase() }
}