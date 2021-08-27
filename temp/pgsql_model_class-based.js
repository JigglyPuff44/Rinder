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

export { PG };

//  ┌──────────────────────────────┐
//  │        MODULE IMPORTS        │
//  └──────────────────────────────┘
import { Pool } from 'pg';                    // import the Pool class from node-postgres
import PG_URI from '../config/config.js'  // import the URI for ElephantSQL

//  ┌──────────────────────────────┐
//  │        DATABASE SETUP        │
//  └──────────────────────────────┘

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || PG_URI;

// instanciate a pool passing in the remote db URI
const pool = new Pool({
  connectionString: URI
});


class PG {
  constructor(){
    this.pool = new Pool({
      connectionString: URI
    });
  }

}



//  ┌──────────────────────────────┐
//  │            EXPORT            │
//  └──────────────────────────────┘
module.exports = pool; // <-- export your model
