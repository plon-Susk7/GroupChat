import { useEffect, useRef, useState } from "react";

export const JoinWindow = () => {
  const roomRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

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

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
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
      );
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
