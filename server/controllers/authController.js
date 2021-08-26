/**
 * ************************************
 *
 * @file        authControler.js
 * @description exports AuthController class containing middleware for handling user authentication
 * @author      Ted Craig
 * @date        2021.08.25
 * @link        https://github.com/JigglyPuff44/Rinder.git
 * @since       0.1.0
 *
 * ************************************
 */

//  ┌──────────────────────────────┐
//  │            EXPORT            │
//  └──────────────────────────────┘
export { AuthController };  // export to stop TypeScript from complaining when importing authController into server.js


//  ┌──────────────────────────────┐
//  │        MODULE IMPORTS        │
//  └──────────────────────────────┘
const logger = require('../logger');
const db = require('../../models/pgsql_model');
const randomstring = require('randomstring');


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
    const queryText = 'SELECT user_id, name FROM users WHERE username = $1 AND password = $2';
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

//  ┌──────────────────────────────┐
//  |   CHECK FOR EXISTING USER    |
//  └──────────────────────────────┘
checkForExistingUser(req, res, next){

  logger.info('[authController.js] checkForExistingUser:  entering middleware');
  logger.info('[authController.js] checkForExistingUser:  incoming req.body:\n', req.body);

  const { name, username, password } = req.body;

  logger.info(`[authController.js] checkForExistingUser:  user: ${name} username: ${username}, password: ${password}`);


  // define SQL query string and parameteric values
  //const queryText = 'SELECT user_id, name FROM users WHERE username = $1 AND password = $2';
  const queryText = 'SELECT * FROM users WHERE username = $1';
  const queryValues = [username];

  // submit query to the database
  //pool.query(queryText, queryValues, (err, result) =>{
  db.query(queryText, queryValues, (err, result) => {
    if (err){
      // handle error here
      // pass the error message object into next() in order to trigger the global error handler
      return next(err);
    } else {
      
      logger.info('[authController.js] checkForExistingUser:  result.rows:\n', result.rows);
      
      res.locals.bUserExists = false;

      if (result.rows.length > 0) {
        res.locals.bUserExists = true;
      }
      
      logger.info(`[authController.js] checkForExistingUser:  res.locals.bUserExists: ${res.locals.bUserExists}`);

      return next();
    }

  });

} // end of checkForExistinUser()




//  ┌──────────────────────────────┐
//  |           ADD USER           |
//  └──────────────────────────────┘
  addUser(req, res, next){

    logger.info('[authController.js] addUser:  entering middleware');

    logger.info(`[authController.js] addUser:  res.locals.bUserExists: ${res.locals.bUserExists}`);

    if (res.locals.bUserExists){
      // user already exists
      return next();
      //res.locals.userInfo = 'username already exists'

    } else {
      
    // user doesn't exist

    logger.info('[authController.js] addUser:  incoming req.body:\n', req.body);

    const { name, username, password } = req.body;

    logger.info(`[authController.js] addUser:  user: ${name} username: ${username}, password: ${password}`);
 

    // define SQL query string and parameteric values
    //const queryText = 'SELECT user_id, name FROM users WHERE username = $1 AND password = $2';
    const queryText = 'INSERT INTO users (name,username,password) VALUES ($1, $2, $3) RETURNING user_id, name'
    const queryValues = [name, username, password];

    // submit query to the database
    //pool.query(queryText, queryValues, (err, result) =>{
    db.query(queryText, queryValues, (err, result) => {
      if (err){
        // handle error here
        // pass the error message object into next() in order to trigger the global error handler
        return next(err);
      } else {
        
        logger.info('[authController.js] addUser:  result.rows:\n', result.rows);
        
        // assign result as userID to locals property on response object
        res.locals.userInfo = result.rows[0];
        
        logger.info('[authController.js] addUser:  result.rows[0]: ', result.rows[0]);
        logger.info('[authController.js] addUser:  res.locals.userInfo: ', res.locals.userInfo);

        return next();
      }

    });
    }

  } // end of addUser()


//  ┌──────────────────────────────┐
//  |      GENERATE ROOM ID        |
//  └──────────────────────────────┘
  generateRoomId(req, res, next){

    logger.info('[authController.js] generateRoomId:  entering middleware');
    
    logger.info(`[authController.js] generateRoomId:  incoming res.locals.userId: ${res.locals.userId}`);

    // generate the roomId;
    const roomId = randomstring.generate(4);
      
    logger.info(`[authController.js] generateRoomId:  generated roomId: ${roomId}`);

    // add roomId to response object
    res.locals.roomId = roomId;

    logger.info(`[authController.js] generateRoomId:  assigned res.locals.roomId: ${res.locals.roomId}`);

    return next();

  } // end of generateRoomId()


//  ┌──────────────────────────────┐
//  |       ADD ROOM TO USER       |
//  └──────────────────────────────┘
  addRoomToUser(req, res, next){

    logger.info('[authController.js] addRoomToUser:  entering middleware');

    logger.info(`[authController.js] addRoomToUser:  incoming req.body: ${req.body}`);
    
    logger.info(`[authController.js] addRoomToUser:  incoming res.locals.userId: ${res.locals.userId}`);
    logger.info(`[authController.js] addRoomToUser:  incoming res.locals.roomId: ${res.locals.roomId}`);

    //const { roomId, username, password } = req.body;
    //logger.info(`[authController.js] addRoomToUser:  user: ${name} username: ${username}, password: ${password}`);


    // define SQL query string and parameteric values
    const queryText = 'UPDATE users SET room = $1 WHERE user_id = $2 RETURNING user_id, room'
    const queryValues = [res.locals.roomId, res.locals.userId];

    // submit query to the database
    //pool.query(queryText, queryValues, (err, result) =>{
    db.query(queryText, queryValues, (err, result) => {
      if (err){
        // handle error here
        // pass the error message object into next() in order to trigger the global error handler
        return next(err);
      } else {
        
        logger.info('[authController.js] addRoomToUser:  result.rows: ', result.rows);
        
        // assign result as userID to locals property on response object
        res.locals.roomAdded = result.rows[0];
        
        logger.info('[authController.js] addRoomToUser:  result.rows[0]: ', result.rows[0]);
        logger.info('[authController.js] addRoomToUser:  res.locals.roomAdded: ', res.locals.roomAdded);

        return next();
      }

    }); // end of query
    
  } // end of addRoomToUser()

} // end of AuthController


//  ┌──────────────────────────────┐
//  │            EXPORT            │
//  └──────────────────────────────┘
// module.exports = authControler;   // nevermind -- typescript prefers export at the top of the file