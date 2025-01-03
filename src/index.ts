import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8081 });

interface User{
    socket : WebSocket;
    room : string;
}


/*
    API format 

    {
        type : "join" | "chat",
        payload : {
            roomId : string, for join
            message : string, for chat
        }
    }

*/

let allSockets : User[] = [];

wss.on("connection", (socket) => {

    
    socket.on("message",(message)=>{
        const parsedMessage = JSON.parse(message.toString());
        if(parsedMessage.type === "join"){
            allSockets.push({
                socket,
                room : parsedMessage.payload.roomId
            })
            socket.send("Joined room " + parsedMessage.payload.roomId);
        }

        if(parsedMessage.type === "chat"){
            const currentUserRoom = allSockets.find((x)=> x.socket== socket)?.room;
            
            console.log(parsedMessage.payload.message);
            allSockets.forEach((user)=>{
                if(user.room == currentUserRoom){
                    user.socket.send(parsedMessage.payload.message);

                }
            })
        }
    })


});