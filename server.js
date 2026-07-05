const express = require("express");
const http = require("http");
const cors = require("cors");

const {
 initializeSocket
}
= require("./sockets/socket");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

initializeSocket(server);

server.listen(5000,()=>{
 console.log("Server running");
}); 