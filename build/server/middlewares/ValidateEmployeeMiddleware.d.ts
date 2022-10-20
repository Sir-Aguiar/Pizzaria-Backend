import { NextFunction, Request, Response } from "express";
declare const RoutesForValidation: string[];
declare const ValidateEmployeeMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export { RoutesForValidation, ValidateEmployeeMiddleware };
