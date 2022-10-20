export declare class Order {
    items_price: number;
    delivery: number;
    status: -1 | 0 | 1 | 2 | -2;
    client: Client;
    items: string[];
    payment_method: string;
    readonly _id: string;
    private readonly created_at;
    constructor(items_price: number, delivery: number, status: -1 | 0 | 1 | 2 | -2, client: Client, items: string[], payment_method: string, _id: string);
    get id(): string;
    get created(): Date;
}
