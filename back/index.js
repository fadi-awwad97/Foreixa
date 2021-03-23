var express = require('express');
const orango = require('orango')
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


application.use(express.json());
application.use(bodyparser.urlencoded ({
    extended:true
}));



application.use("/user", require("./routes/userRouter"));

application.use("/currency", require("./routes/currenciesRouter"));






// var WebSocketServer = require('websocket').server;
// var http = require('http');

// var server = http.createServer(function(request, response) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.writeHead(404);
//     response.end();
// });
// server.listen(8080, function() {
//     console.log((new Date()) + ' Server is listening on port 8080');
// });

// wsServer = new WebSocketServer({
//     httpServer: server,
//     // You should not use autoAcceptConnections for production
//     // applications, as it defeats all standard cross-origin protection
//     // facilities built into the protocol and the browser.  You should
//     // *always* verify the connection's origin and decide whether or not
//     // to accept it.
//     autoAcceptConnections: false
// });

// function originIsAllowed(origin) {
//   // put logic here to detect whether the specified origin is allowed.
//   return true;
// }

// wsServer.on('request', function(request) {
//     if (!originIsAllowed(request.origin)) {
//       // Make sure we only accept requests from an allowed origin
//       request.reject();
//       console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//       return;
//     }
    
//     var connection = request.accept('echo-protocol', request.origin);
//     console.log((new Date()) + ' Connection accepted.');
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log('Received Message: ' + message.utf8Data);
//             connection.sendUTF(message.utf8Data);
//         }
//         else if (message.type === 'binary') {
//             console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//             connection.sendBytes(message.binaryData);
//         }
//     });
//     connection.on('close', function(reasonCode, description) {
//         console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//     });
// });