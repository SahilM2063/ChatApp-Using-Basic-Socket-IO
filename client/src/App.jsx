/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import io from "socket.io-client";
import ChatBox from "./components/ChatBox";

const socket = io.connect("http://localhost:6969");

function App() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && roomName !== "") {
      console.log(userName, roomName);

      socket.emit("join_room", { user: userName, room: roomName });
      setShowChat(true);
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center h-screen">
      {!showChat ? (
        <div className="flex flex-col justify-between items-start gap-4">
          <h1 className="text-4xl font-[Gilroy] font-semibold mb-4 text-center">
            Join a room for Chat
          </h1>
          <input
            className="input input-bordered focus:input-bordered focus:outline-none w-full"
            type="text"
            name="username"
            placeholder="Jhon..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="input input-bordered focus:input-bordered focus:outline-none w-full"
            type="text"
            name="roomname"
            placeholder="Room id..."
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button className="btn w-full" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      ) : (
        <ChatBox
          socket={socket}
          username={userName}
          roomname={roomName}
          id={socket.id}
        />
      )}
    </div>
  );
}

export default App;
