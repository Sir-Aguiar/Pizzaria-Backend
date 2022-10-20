import { Order } from "../entities/order";
export declare class UpdateOrder {
    private readonly order;
    private readonly employee;
    constructor(order: Order, employee: EmployeeCredential);
    changeOrderStatus(new_status: number): Promise<void>;
    changeDeliveryPrice(new_delivery: number): Promise<void>;
}
