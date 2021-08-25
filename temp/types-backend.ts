/**
 * ************************************
 *
 * @file        types-backend.ts
 * @description Exports typescript type definitions for use in the backend
 * @author      Ted Craig
 * @date        2021.08.24
 * @link        https://github.com/JigglyPuff44/Rinder.git
 * @since       0.1.0
 *
 * ************************************
 */


//  ┌──────────────────────────────┐
//  │        MODULE IMPORTS        │
//  └──────────────────────────────┘  
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';


//  ┌──────────────────────────────┐
//  │       TYPE DEFINITIONS       │
//  └──────────────────────────────┘  
export type Middleware = (req: Request, res: Response, next: NextFunction) => void;
export type MiddlewareFinal = (req: Request, res: Response) => void;  // this may not be necessary.  I think typescript can handle next not being there while using the definition above
export type UniversalErrHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => void;