/**
 * ************************************
 *
 * @file        pgsql_model.ts
 * @description exports postgreSQL database pool
 * @author      Ted Craig
 * @date        2021.08.25
 * @link        https://github.com/JigglyPuff44/Rinder.git
 * @since       0.1.0
 *
 * ************************************
 */

// export { pool };

//  ┌──────────────────────────────┐
//  │        MODULE IMPORTS        │
//  └──────────────────────────────┘
//import { Pool } from 'pg';                    // import the Pool class from node-postgres
const { Pool } = require('pg');
//import PG_URI from '../config/config.js'  // import the URI for ElephantSQL
const config = require('../config/config.js')
const logger = require('../server/logger.js')

//  ┌──────────────────────────────┐
//  │        DATABASE SETUP        │
//  └──────────────────────────────┘


logger.info('[pgsql_model.js] config:')
logger.info(config)
//console.log(config)
//logger.info('[pgsql_model.js] config.PG_URI:')
//console.log(config.PG_URI);

const URI = config.PG_URI;

logger.info('[pgsql_model.js] URI:')
//console.log(URI);
logger.info(URI);
//const URI = process.env.PG_URI || config.PG_URI;
//logger.info('[pgsql_model.js] URI:\n', URI)
// console.log('[pgsql_model.js](console.log) URI:\n', URI)

// instantiate a pool passing in the remote db URI
const pool = new Pool({
  connectionString: URI
});

//  ┌──────────────────────────────┐
//  │            EXPORT            │
//  └──────────────────────────────┘
module.exports = pool; // <-- export your model
