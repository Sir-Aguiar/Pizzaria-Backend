export class OrderError {
  constructor(
    public readonly message: string,
    public readonly error_name: string,
    public readonly cause: string,
    public readonly stack?: string
  ) {
  }
  public register() {
    // Implements an error register system
  }
  public logIt() {
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
