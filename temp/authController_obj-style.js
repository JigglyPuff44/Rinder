/**
 * ************************************
 *
 * @file        authControler.js
 * @description exports middleware for handling user authentication
 * @author      Ted Craig
 * @date        2021.08.25
 * @link        https://github.com/JigglyPuff44/Rinder.git
 * @since       0.1.0
 *
 * ************************************
 */

export { authController };  // export to stop TypeScript from complaining when importing authController into server.js

//  ┌──────────────────────────────┐
//  │        MODULE IMPORTS        │
//  └──────────────────────────────┘
// import { Request, Response, NextFunction } from 'express'; // for typescript
import logger from "../server/logger"; // logger created using winston logging library (to prevent typescript from complaining about console logs)
import { pool as db } from '../models/pgsql_model.js';


//  ┌──────────────────────────────┐
//  │          CONSTANTS           │
//  └──────────────────────────────┘
// type MiddlewareFn = (req: Request, res: Response, next: NextFunction ) => NextFunction;
// const authController: { [index: string]: MiddlewareFn } = {}; // enforce types:  index must be a string and its value must be a function
const authController = {};


//  ┌──────────────────────────────┐
//  │         VERIFY USER          │
//  └──────────────────────────────┘
authController.verifyUser = (req, res, next) => {

  logger.info('[authController.js] verifyUser:  entering middleware');
  logger.info('[authController.js] verifyUser:  incoming req.body:\n', req.body);

  const { username, password } = req.body;

  logger.info(`[authController.js] verifyUser:  username: ${username}, password: ${password}`);

  // define SQL query string and parameteric values
  const queryText = 'SELECT user_id FROM users WHERE username = $1 AND password = $2';
  const queryValues = [username, password];

  // submit query to the database
  db.query(queryText, queryValues, (err, result) =>{
    if (err){
      // handle error here
      return next(err);
    } else {
      logger.info('[authController.js] verifyUser:  result.rows:\n', result.rows);
      // assign result as userID to locals property on response object
      res.locals.userId = result.rows[0];
    }

  });

  return next();

};


//  ┌──────────────────────────────┐
//  │            EXPORT            │
//  └──────────────────────────────┘
module.exports = authController;