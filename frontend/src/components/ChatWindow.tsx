import { useRecoilValue } from "recoil";
import { socketState } from "../atoms/Socket";
import { useRef } from "react";
import { useState } from "react";

export const ChatWindow = () => {

    const [messages,setMessages] = useState<string[]>([]);

    const socket = useRecoilValue(socketState) as WebSocket | null;
    const chatBoxRef = useRef<HTMLInputElement>(null);
    const sendMessage = () => {

        const message = JSON.stringify({
            type : "chat",
            payload : {
                message : chatBoxRef.current?.value
            }
        });

        socket?.send(message);
    }

    setTimeout(()=>{
      console.log("Navigating to chat window");
    },2000)
    //@ts-ignore
    socket.onmessage = (event) => {
      if(event.data){
        setMessages([...messages,event.data]);
      }
    }
    

    return (
      <div className="bg-gray-800 text-white h-screen flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Chat Window</h1>

        <div className="bg-gray-700 w-full max-w-3xl flex-grow rounded-md p-4 mb-4 overflow-y-auto shadow-md">
          {messages && messages.map((message,index)=>{
              return <div key={index} className="p-2 bg-gray-600 rounded-md mb-2">{message}</div>
          })}
        </div>
  
        <div className="flex w-full max-w-3xl items-center space-x-2">
          <input
            ref = {chatBoxRef}
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-3 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={()=>sendMessage()} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold transition">
            Send
          </button>
        </div>
      </div>
    );
  };
  