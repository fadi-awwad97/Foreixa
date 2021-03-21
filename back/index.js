var express = require('express');
const orango = require('orango')
const fileupload = require("express-fileupload");
const cors = require("cors");
var users = require('./models/userModel');
const bodyparser = require("body-parser");


var application = express();
application.get('/', function (req, res) {
  res.send('Hello World!');
});
application.listen(5000, function () {
  console.log('Listening to Port 5000');
});



const { EVENTS } = orango.consts;   // Introduce a method to connect to the database
const db = orango.get('_system'); // Connect to the default database_system

db.events.on(EVENTS.CONNECTED, conn => {
   console.log(' Connected to ArangoDB:', conn.url)   //conn.url is the address of the database and not the address of the server
})
 
db.events.on(EVENTS.READY, () => {
   console.log('  Orango is ready!')
})

async function main() {
    try {
    //   registerModels(db)
  
      await db.connect({ username: 'root', password: 'Fadiawwad123' })
      // everything is initialized and we are ready to go
      console.log('Are we connected?', db.connection.connected) // true
    } catch(e) {
      console.log('Error:', e.message)
    }
  }
 
main()


application.use(express.static('public'));   
application.use('/images', express.static('images')); 

application.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-auth-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

// application.use(cors());
// application.use(fileupload());
// application.use(express.static("files"));

// const bodyParser = require ('body-parser');


application.use(express.json());
application.use(bodyparser.urlencoded ({
    extended:true
}));


 









application.use("/user", require("./routes/userRouter"));

application.use("/currency", require("./routes/currenciesRouter"));