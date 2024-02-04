/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";

const ChatBox = ({ socket, username, roomname, id }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const chatBodyRef = useRef(null);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomname,
        user: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  useMemo(() => {
    socket.on("receive_message", (data) => {
      // console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <>
      <div className="w-[96%] md:max-w-[70%] lg:max-w-[48%] xl:max-w-[38%] 2xl:max-w-[30%] max-h-[60%] flex flex-col justify-between items-start gap-4 bg-red rounded-lg border border-gray-200 shadow-md p-4 my-4">
        <div className="chat-header w-full max-h-[16%] leading-3">Live Now</div>
        {messageList.length === 0 ? (
          <div className="chat-body w-full flex-1 bg-slate-100 rounded-md overflow-y-scroll overflow-x-hidden">
            <p className="w-full text-center">no messages here</p>
          </div>
        ) : (
          <div
            className="chat-body w-full flex-1 bg-slate-100 rounded-md overflow-y-scroll overflow-x-hidden"
            ref={chatBodyRef}
          >
            {messageList.map((item, index) => {
              return (
                <div
                  className={
                    id === item.id ? "chat chat-end" : "chat chat-start"
                  }
                  // className="chat chat-end"
                  key={index}
                >
                  <div className="chat-header">{item.user}</div>
                  <div className="chat-bubble py-0 items-center flex min-h-9">
                    {item.message}
                  </div>
                  <div className="chat-footer">
                    <time className="text-xs opacity-50">{item.time}</time>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="chat-footer w-full flex gap-2 min-h-[16%]">
          <input
            className="input input-bordered focus:input-bordered focus:outline-none  flex-1"
            type="text"
            placeholder="Write a message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage();
            }}
          />
          <button className="btn min-w-[12%] max-w-[16%]" onClick={sendMessage}>
            <FaLocationArrow size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
