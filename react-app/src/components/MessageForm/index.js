import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as messageStore from "../../store/messages";
import { authenticate } from "../../store/session";
import { io } from "socket.io-client";
import "./index.css";

let socket;

export default function MessageForm() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messagesState = useSelector((state) => state.messages);
  const sessionUser = useSelector((state) => state.session.user);
  const messagesArray = Object.values(messagesState);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const allChannels = useSelector((state) =>
    state.channels.allChannels ? state.channels.allChannels : {}
  );
  const currentChannel = useSelector((state) =>
    state.channels.currentChannel ? state.channels.currentChannel : null
  );

  useEffect(() => {
    //Open Socket Connection
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    //disconnect on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  let name;

  let entries = Object.entries(allChannels);
  for (const [key, value] of entries) {
    if (currentChannel === value["id"]) {
      name = value["name"];
    }
  }
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const data = {
  //       content: message,
  //       owner_id: sessionUser.id,
  //     };

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();

    try {
      dispatch(authenticate());
      dispatch(
        messageStore.sendMessageThunk(currentChannel, {
          content: message,
          owner_id: sessionUser.id,
        })
      );
      // Send the message
      socket.emit("chat", {
        content: chatInput,
        channel_id: currentChannel,
      });
      setChatInput("");

      // Fetch the updated messages after sending the message
      dispatch(messageStore.getchannelMessagesThunk(currentChannel));
    } catch (error) {
      // Handle any errors that occur during message sending or fetching
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div>
        {messagesArray.map((message) => (
          <div key={message.id}>{`${message.content}`}</div>
        ))}
      </div>
      <form onSubmit={sendChat}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #${name}`}
        ></input>
      </form>
    </div>
  );
}
