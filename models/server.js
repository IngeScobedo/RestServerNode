const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    this.paths = {
      users: '/api/users',
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
    }
    
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
    this.app.use(this.paths.auth, require('../routes/auth') );
    this.app.use(this.paths.users, require('../routes/users') );
    this.app.use(this.paths.categories, require('../routes/categories') );
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.search, require('../routes/search') );
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log("Server listen on port " + this.PORT);
    });
  }
}

module.exports = Server;
