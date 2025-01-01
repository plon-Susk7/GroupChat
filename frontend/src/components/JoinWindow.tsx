import { useNavigate } from "react-router-dom";
import { socketState } from "../atoms/Socket";
import { useSetRecoilState } from "recoil";
import { roomIdState } from "../atoms/RoomId";
import { useRef } from "react";

export const JoinWindow = () => {
  const navigate = useNavigate();
  const setSocket = useSetRecoilState(socketState);
  const setRoomId = useSetRecoilState(roomIdState);
  const roomIdRef = useRef<HTMLInputElement>(null);

  const generateRandomWord = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      word += letters[randomIndex];
    }
    
    return word;
  };
  
  const createRoom = () => {
    const socket = new WebSocket("ws://localhost:8081");
    const randomRoomId = generateRandomWord();
    
    socket.onopen = () => {
      const message = JSON.stringify({
        type: "join",
        payload: {
          roomId: randomRoomId
        }
      });
      //@ts-ignore
      setSocket(socket);
      setRoomId(randomRoomId);
      socket.send(message);
    }

    socket.onmessage = (event) => {
      console.log("Message from server", event.data);
    }

    socket.onerror = (event) => {
      console.log(event);
    }

    socket.onclose = (event) => {
      console.log(event);
    }

    setTimeout(()=>{
      console.log("Navigating to chat window");
    },2000)
    navigate('/chat');
  }

  const joinRoom = () => {
    if (!roomIdRef.current?.value) {
      alert("Please enter a room code");
      return;
    }

    const socket = new WebSocket("ws://localhost:8081");
    const roomId = roomIdRef.current.value;

    socket.onopen = () => {
      const message = JSON.stringify({
        type: "join",
        payload: {
          roomId: roomId
        }
      });
      //@ts-ignore
      setSocket(socket);  // Add this line
      setRoomId(roomId); // Add this line
      socket.send(message);
    }

    socket.onmessage = (event) => {
      console.log("Message from server", event.data);
    }

    socket.onerror = (event) => {
      console.log(event);
    }

    socket.onclose = (event) => {
      console.log(event);
    }

    navigate('/chat');
  }

  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-gray-500">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-sans text-lg text-white">Enter room code</h1>
        <input 
          ref={roomIdRef}
          className="border rounded-lg p-1 bg-gray-700 text-white"
          type="text"
          placeholder="Enter room code"
        />
        <button 
          onClick={joinRoom}
          className="border focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Join
        </button>
      </div>

      <div>
        <button 
          onClick={createRoom}
          className="border focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Create New Room
        </button>
      </div>
    </div>
  );
};