import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const JoinWindow = () => {
  const roomRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
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

    setSocket(ws);
  }, []); 

  const handleEntry = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("Joining room");

      socket.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomRef.current ? roomRef.current.value : "",
          },
        })
      )
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
