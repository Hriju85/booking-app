let io;

const initializeSocket = (server) => {

    const { Server } = require("socket.io");

    io = new Server(server,{
        cors:{
            origin:"*"
        }
    });

    io.on("connection",(socket)=>{

        console.log("Connected",socket.id);

        socket.on("joinBusinessRoom",(businessId)=>{
            socket.join(businessId);
        });

        socket.on("disconnect",()=>{
            console.log("Disconnected");
        });

    });
};

const getIO = () => io;

module.exports = {
    initializeSocket,
    getIO
};