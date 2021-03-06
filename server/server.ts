/**
 * ************************************
 *
 * @file        server.ts
 * @description Server listens on port 3000 and routes all incoming requests, handles global middleware errors and unknown endpoint errors
 * @author      Ted Craig
 * @date        2021.08.24
 * @link        https://github.com/JigglyPuff44/Rinder.git
 * @since       0.1.0
 *
 * ************************************
 */

//  ┌──────────────────────────────┐
//  │        MODULE IMPORTS        │
//  └──────────────────────────────┘
import express, { Request, Response, NextFunction } from 'express';    // express server functionality
import path from 'path';                                               // file path tools - filesystem agnostic path structures
import cookieParser from 'cookie-parser';                              // cookie middleware
import logger from './logger';                                         // logger created using winston logging library (to prevent typescript from complaining about console logs)
import randomstring from 'randomstring';                               // random alphanumeric string generator used to create room ID
import { AuthController } from './controllers/authController.js';          // authentication middleware
const cors = require('cors'); 
//import { authController } from './controllers/authController_obj-style';
// import { Middleware } from '../temp/types-backend';
// import { authController } from './controllers/authController_obj-style';

//  ┌──────────────────────────────┐
//  │          CONSTANTS           │
//  └──────────────────────────────┘
const app = express();                                                // create express server
app.use(cors());
const PORT = process.env.PORT || 3000;                                // set constant for the port, default to 3000
// const DEBUG = (process.env.NODE_ENV === 'development') || false;      // set debug flag for use in logging, default to false
const authController: AuthController = new AuthController();

// ANSI colors for message visibilty
// https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html

// declare labels to store color codes
const colorBox = '\u001b[38;5;240m';
const colorMsg = '\u001b[38;5;39m';
const colorImportant = '\u001b[38;5;87m';
const decoratorBold = '\u001b[1m';
const colorReset = '\u001b[0m';
const colorLogMain = '\u001b[38;5;214m';
const colorLogBright = '\u001b[38;5;220m';


//  ┌──────────────────────────────┐
//  │   PRE- PARSING / FORMATTING  │
//  └──────────────────────────────┘
app.use(express.json());                          // parse any json strings found in the request body
app.use(express.urlencoded({ extended: true }));  // parse any params found within the request url, place result in req.params
app.use(cookieParser());                          // parse any cookies found in the request


//  ┌──────────────────────────────┐
//  │           ROUTING            │
//  └──────────────────────────────┘

//  ========= POST: /LOGIN =========
// when user pushes the log in button
app.post('/login',
  
  (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${colorLogMain}[server.ts] ${colorLogBright}app.post '/login' ${colorLogMain}endpoint requested...${colorReset}`);
    return next();
  },

  <any>authController.verifyUser,

  (req: Request, res: Response) => {
    logger.info(`[server.ts] app.post '/login' endpoint: res.locals.userInfo:\n`, res.locals.userInfo);
    if (res.locals.userInfo === undefined){
      res.json('username/password is incorrect');
    } else {
      res.json(res.locals.userInfo);
    }
  }

); // end of POST: /login


//  ========= POST: /SIGNUP ========
// when user pushes the sign up button
app.post('/signUp',

  (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${colorLogMain}[server.ts] ${colorLogBright}app.post '/signUp' ${colorLogMain}endpoint requested...${colorReset}`);
    return next();
  },

  <any>authController.checkForExistingUser,

  <any>authController.addUser,

  (req: Request, res: Response) => {
    logger.info(`[server.ts] app.post '/signUp' endpoint: res.locals.userInfo:\n`, res.locals.userInfo);
    if (res.locals.bUserExists){
      logger.info(`[server.ts] app.post '/signUp' username already exists ...`);
      res.json('username already exists');
    } else if(res.locals.userInfo === undefined) {
      res.json('username already exists'); // this should really be a different response
    } else {
      res.json(res.locals.userInfo);
    }
  }
); // end of POST: /signUp


//  ========= GET: /ROOMID =========
// when user pushes the create room button
app.get('/roomID/:userId',

  (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${colorLogMain}[server.ts] ${colorLogBright}app.get '/roomID' ${colorLogMain}endpoint requested...${colorReset}`);

    logger.info(`[server.ts] app.get '/roomID':  req.params.userId: ${req.params.userId} (assigning to res.locals.userId...)`);

    // assign userId to res.locals.userId
    res.locals.userId = req.params.userId;

    logger.info(`[server.ts] app.get '/roomID':  res.locals.userId: ${res.locals.userId}`);

    return next();
  },

  <any>authController.generateRoomId,

  <any>authController.addRoomToUser,

  (req: Request, res: Response) => {
    //const roomId = res.locals.roomId;
    //console.log(roomId);
    logger.info(`[server.ts] app.get '/roomID' endpoint: res.locals.roomId: ${res.locals.roomId}`);
    logger.info(`[server.ts] app.get '/roomID' endpoint: res.locals.userId: ${res.locals.userId}`);
    logger.info(`[server.ts] app.get '/roomID' endpoint: res.locals.roomAdded: `, res.locals.roomAdded);
    
    // what does the frontend want back?
    // for now -- just sending roomId string
    res.json(res.locals.roomId);
  }

); // end of GET: /roomID


//  ========= POST: /ROOMID ======== 
// when user tries to join a room by clicking the join room body
app.post('/roomID',

  (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${colorLogMain}[server.ts] ${colorLogBright}app.post '/roomID' ${colorLogMain}endpoint requested...${colorReset}`);
    return next();
  },

  <any>authController.checkForRoomId,

  <any>authController.addRoomToUser,

  (req: Request, res: Response) => {
    logger.info(`[server.ts] app.post '/roomID' endpoint: res.locals.userInfo:\n`, res.locals.userInfo);
    if (res.locals.bRoomExists){
      logger.info(`[server.ts] app.post '/roomID' successful, routing to room: ${res.locals.roomId}`);
      res.json(`routing to room: ${res.locals.roomId}`);
    } else {
      logger.info(`[server.ts] app.post '/roomID' failed`);
      res.json('roomId does not exist');
    }
  }

); // end of POST: /roomID


// //  ========= GET: /waiting =========
// // when user pushes either the join room or the create room button
// app.get('/waiting/:roomID',

//   (req: Request, res: Response, next: NextFunction) => {
//     logger.info(`${colorLogMain}[server.ts] ${colorLogBright}app.get '/waiting/:roomID' ${colorLogMain}endpoint requested...${colorReset}`);

//     logger.info(`[server.ts] app.get '/waiting/roomID': `);

//     // // assign userId to res.locals.userId
//     // res.locals.userId = req.params.userId;

//     logger.info(`[server.ts] app.get '/roomID':  res.locals.userId: ${res.locals.userId}`);

//     return next();
//   },

//   <any>authController.generateRoomId,

//   <any>authController.addRoomToUser,

//   (req: Request, res: Response) => {
//     //const roomId = res.locals.roomId;
//     //console.log(roomId);
//     logger.info(`[server.ts] app.get '/roomID' endpoint: res.locals.roomId: ${res.locals.roomId}`);
//     logger.info(`[server.ts] app.get '/roomID' endpoint: res.locals.userId: ${res.locals.userId}`);
//     logger.info(`[server.ts] app.get '/roomID' endpoint: res.locals.roomAdded: `, res.locals.roomAdded);
    
//     // what does the frontend want back?
//     // for now -- just sending roomId string
//     res.json(res.locals.roomId);
//   }

//); // end of GET: /roomID



//  ========= GET: /RESTAURANTS ======== 
// from waiting room.  This request assumes that a group of restaurants has already had the target room number added to each of their room fields in the database
app.get('/restaurants/:roomId',

  (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${colorLogMain}[server.ts] ${colorLogBright}app.get '/restaurants' ${colorLogMain}endpoint requested...${colorReset}`);

    logger.info(`[server.ts] app.get '/restaurants/:roomId':  req.params.roomId: ${req.params.roomId} (assigning to res.locals.roomId)`);

    // assign userId to res.locals.userId
    res.locals.roomId = req.params.roomId;

    logger.info(`[server.ts] app.get '/restaurants/:roomId':  res.locals.roomId: ${res.locals.roomId}`);

    return next();
  },

  <any>authController.getRestaurantList,

  (req: Request, res: Response) => {
    logger.info(`[server.ts] app.get '/restaurants/:roomId' endpoint: res.locals.restaurantList:\n`, res.locals.restaurantList);
    if (res.locals.restaurantList){
      // send restaurant list to front end
      res.json(res.locals.restaurantList);
    } else {
      logger.info(`[server.ts] app.get '/restaurants/:roomId' failed`);
      res.json('no restaurants found');
    }
  }

); // end of GET: /restaurants/:roomId



//  ============ GET: / ============
// loading the static main page
app.get('/', (req: Request, res: Response) => {
  logger.info(`[server.js] app.get '/' endpoint requested...`);
  res.send(`You've contacted endpoint '/'`);
}); // end of GET: /



//  ============= 404 ==============
// error 404 handler
app.use( (req: Request, res: Response) =>{
  res.status(404).send('Unable to fulfill your request');
}); // end of 404


//  ┌──────────────────────────────┐
//  │   UNIVERSAL ERROR HANDLER    │
//  └──────────────────────────────┘
app.use( (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // TODO: need to actually handle various errors here and send appropriate messages to client
  res.status(500).send(err.message);
});


//  ┌──────────────────────────────┐
//  │           LISTENER           │
//  └──────────────────────────────┘

// invoke the listener
app.listen( PORT, async () => {

  /* tslint:disable:no-console */

  // server info console msg
  console.log(`${colorBox}┌───────────────────────────────────────────┐`);
  console.log(`${colorBox}│${colorMsg} Server listening at ${colorImportant}http://localhost:${PORT}${colorBox} │`);
  console.log(`${colorBox}└───────────────────────────────────────────┘${colorReset}`);
  // node environment console msg
  if (process.env.NODE_ENV !== undefined) console.log(`${colorMsg}Node environment: ${decoratorBold}${process.env.NODE_ENV}${colorReset}`);

}); // end of app.listen()