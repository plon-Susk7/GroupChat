import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { socketState } from "../atoms/Socket";

export const JoinWindow = () => {
  const roomRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useRecoilState(socketState);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if socket is already set
    if (!socket) {
      const ws = new WebSocket("ws://localhost:8080");

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      //@ts-ignore
      setSocket(ws);
    }
  }, [socket, setSocket]); // Only create the WebSocket if it doesn't exist

  const handleEntry = () => {
    const roomId = roomRef.current ? roomRef.current.value : "";

    if (!roomId) {
      console.error("Room ID is required.");
      return;
    }

    //@ts-ignore
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("Joining room");
      
      //@ts-ignore
      socket.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
          },
        })
      );
      navigate("/chat");
    } else {
      console.error("WebSocket is not open yet.");
    }
  };

  return (
    <>
      <div>
        <h1>Enter room code</h1>
        <input ref={roomRef} type="text" placeholder="Enter room code" />
        <button onClick={handleEntry}>Join</button>
      </div>
    </>
  );
};
