export declare class DeleteOrder {
    private readonly employee;
    private readonly order_id;
    constructor(employee: EmployeeCredential, order_id: string);
    execute(): Promise<void>;
}
