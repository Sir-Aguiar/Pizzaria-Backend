"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderError = void 0;
class OrderError {
    constructor(message, error_name, cause, stack) {
        this.message = message;
        this.error_name = error_name;
        this.cause = cause;
        this.stack = stack;
    }
    register() {
        // Implements an error register system
    }
    logIt() {
        console.log({
            message: this.message,
            name: this.error_name,
            cause: this.cause,
            stack: this.stack,
        });
    }
    get props() {
        return {
            message: this.message,
            name: this.error_name,
            cause: this.cause,
            stack: this.stack,
        };
    }
}
exports.OrderError = OrderError;
