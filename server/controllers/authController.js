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

export { AuthController };  // export to stop TypeScript from complaining when importing authController into server.js

//  ┌──────────────────────────────┐
//  │        MODULE IMPORTS        │
//  └──────────────────────────────┘
// import { Request, Response, NextFunction } from 'express'; // for typescript
// import logger from "../logger"; // logger created using winston logging library (to prevent typescript from complaining about console logs)
//import { pool as db } from '../../models/pgsql_model.js';
//import { pool } from '../../models/pgsql_model.js';
// import { PG } from '../../models/pgsql_model_class-based.js';
// const db = new PG();
const logger = require('../logger')
const db = require('../../models/pgsql_model')


//  ┌──────────────────────────────┐
//  |       AUTH CONTROLLER        |
//  └──────────────────────────────┘
class AuthController {

  constructor(){

  } // end of contructor

//  ┌──────────────────────────────┐
//  |         VERIFY USER          |
//  └──────────────────────────────┘
  verifyUser(req, res, next){

    logger.info('[authController.js] verifyUser:  entering middleware');
    logger.info('[authController.js] verifyUser:  incoming req.body:\n', req.body);

    const { username, password } = req.body;

    logger.info(`[authController.js] verifyUser:  username: ${username}, password: ${password}`);

    // define SQL query string and parameteric values
    const queryText = 'SELECT user_id FROM users WHERE username = $1 AND password = $2';
    const queryValues = [username, password];

    // submit query to the database
    //pool.query(queryText, queryValues, (err, result) =>{
    db.query(queryText, queryValues, (err, result) => {
      if (err){
        // handle error here
        // pass the error message object into next() in order to trigger the global error handler
        return next(err);
      } else {
        
        logger.info('[authController.js] verifyUser:  result.rows:\n', result.rows);
        
        // assign result as userID to locals property on response object
        res.locals.userInfo = result.rows[0];
        
        logger.info('[authController.js] verifyUser:  result.rows[0]: ', result.rows[0]);
        logger.info('[authController.js] verifyUser:  res.locals.userInfo: ', res.locals.userInfo);

        return next();
      }

    });

  } // end of verifyUser()


} // end of AuthController
 


//  ┌──────────────────────────────┐
//  │ INSTANTIATE AUTH CONTROLLER  │
//  └──────────────────────────────┘ 
// const authControler = new AuthController();


//  ┌──────────────────────────────┐
//  │            EXPORT            │
//  └──────────────────────────────┘
// module.exports = authControler;