export declare class DeleteOrder {
    private readonly employee;
    private readonly order_id;
    constructor(employee: string, order_id: string);
    execute(): Promise<void>;
}
