/**
 * ************************************
 *
 * @file        logger.js
 * @description Exports a configured logger created using winston logging library in order to prevent typescript from complaining about console logs.
 * @author      Ted Craig
 * @date        2021.08.24
 * @link        https://github.com/JigglyPuff44/Rinder.git
 * @since       0.1.0
 *
 * ************************************
 */


//  ┌──────────────────────────────┐
//  │          HOW TO LOG          │
//  └──────────────────────────────┘  
/*

  EXAMPLE

  logger.log({
    level: 'info',
    message: 'Hello distributed log files!'
  });

        - OR -

  logger.info('Hello again distributed logs'); 


  LEVELS 

  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6

*/


//  ┌──────────────────────────────┐
//  │        MODULE IMPORTS        │
//  └──────────────────────────────┘
 const winston = require('winston');

 
//  ┌──────────────────────────────┐
//  |           LOGGER             |
//  └──────────────────────────────┘
 const logger = winston.createLogger({
   level: 'info',
   format: winston.format.json(),
   //defaultMeta: { service: 'user-service' },
   transports: [
     //
     // - Write all logs with level `error` and below to `error.log`
     // - Write all logs with level `info` and below to `combined.log`
     //
     new winston.transports.File({ filename: 'error.log', level: 'error' }),
     new winston.transports.File({ filename: 'combined.log' }),
   ],
 });
  
 //
 // If we're not in production then log to the `console` with the format:
 // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 //
 if (process.env.NODE_ENV !== 'production') {
   logger.add(new winston.transports.Console({
     format: winston.format.simple(),
   }));
 }


 module.exports = logger;