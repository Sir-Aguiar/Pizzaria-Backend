export declare class OrderError {
    readonly message: string;
    readonly error_name: string;
    readonly cause: string;
    readonly stack?: string | undefined;
    constructor(message: string, error_name: string, cause: string, stack?: string | undefined);
    register(): Promise<void>;
    logIt(): void;
    get props(): {
        message: string;
        name: string;
        cause: string;
        stack: string | undefined;
    };
}
