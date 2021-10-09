const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';
    
    //database conection
    this.dbConect()
    
    // Middleware
    this.middlewares();
    
    
    //Routes
    this.routes();
  }

  async dbConect (){
    await dbConnection();
  }

  middlewares(){
    //CORS
    this.app.use(cors());
    // Read and parse body 
    this.app.use(express.json());
    //Public Route
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth') )
    //this.app.use(this.usersPath, require('../routes/users') )
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log("Server listen on port " + this.PORT);
    });
  }
}

module.exports = Server;
