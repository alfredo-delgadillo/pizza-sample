const { Pool } = require('pg');
const db = require("./models");
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
//const conString = 'postgres://' + config.username + ':' + config.password + '@' + config.host + '/postgres';

const pool = new Pool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: 'postgres',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

pool.connect((err, client, done) => { 
    // create the db and ignore any errors, for example if it already exists.
    client.query('CREATE DATABASE ' + config.database, function(err) {
        //db should exist now, initialize Sequelize
        db.sequelize.sync();
        console.log("Database " + config.database + " sync completed.");
        client.end(); // close the connection
    });
});