const express = require("express");
const cors = require("cors");
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    this.usersPath = '/api/users'

    // Middleware
    this.middlewares();
    
    
    //Routes
    this.routes();
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
    this.app.use(this.usersPath, require('../routes/users') )
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log("Server listen on port " + this.PORT);
    });
  }
}

module.exports = Server;
