import { Order } from "../entities/order";
export declare class CreateOrder {
    private readonly order;
    constructor(order: Order, orderRepository: Order[]);
    execute(): Promise<Order>;
}
