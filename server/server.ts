/**
 * ************************************
 *
 * @file        server.js
 * @description Server listens on port 3000 and routes all incoming requests, handles global middleware errors and unknown endpoint errors
 * @author      Emma Czech, Faraz Moallemi, May Li, Ted Craig
 * @date        2021.08.24
 * @link        https://github.com/JigglyPuff44/Rinder.git
 * @since       0.1.0
 *
 * ************************************
 */

//  ┌──────────────────────────────┐
//  │        MODULE IMPORTS        │
//  └──────────────────────────────┘
import express, { Request, Response, NextFunction } from 'express';                                         // express server functionality
import path from 'path';                                               // file path tools - filesystem agnostic path structures
import cookieParser from 'cookie-parser';                              // cookie middleware
import logger from './logger';                                         // logger created using winston logging library (to prevent typescript from complaining about console logs)
import randomstring from 'randomstring';                               // random alphanumeric string generator used to create room ID


//  ┌──────────────────────────────┐
//  │          CONSTANTS           │
//  └──────────────────────────────┘
const app = express();                                                // create express server
const PORT = process.env.PORT || 3000;                                // set constant for the port, default to 3000
// const DEBUG = (process.env.NODE_ENV === 'development') || false;      // set debug flag for use in logging, default to false


//  ┌──────────────────────────────┐
//  │   PRE- PARSING / FORMATTING  │
//  └──────────────────────────────┘
app.use(express.json());                          // parse any json strings found in the request body
app.use(express.urlencoded({ extended: true }));  // parse any params found within the request url, place result in req.params
app.use(cookieParser());                          // parse any cookies found in the request


//  ┌──────────────────────────────┐
//  │           ROUTING            │
//  └──────────────────────────────┘


//  ============== / ===============
app.get('/', (req: Request, res: Response) => {
  logger.info(`[server.js] app.get '/' endpoint requested...`);
  res.send(`You've contacted endpoint '/'`);
});



//  ============= 404 ==============
app.use( (req: Request, res: Response) =>{
  res.status(404).send('Unable to fulfill your request');
});


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

// ANSI colors for message visibilty
// https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html
// format \u001b[38;5;39m
// reset color \u001b[0m

// declare labels to store color codes
const colorBox = '\u001b[38;5;240m';
const colorMsg = '\u001b[38;5;39m';
const colorImportant = '\u001b[38;5;87m';
const decoratorBold = '\u001b[1m';
const colorReset = '\u001b[0m';

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