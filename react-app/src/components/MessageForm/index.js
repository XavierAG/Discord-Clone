import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as messageStore from "../../store/messages";
import { authenticate } from "../../store/session";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css";

let socket;

export default function MessageForm() {
  const { channel_id } = useParams();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messagesState = useSelector((state) => state.messages);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const sessionUser = useSelector((state) => state.session.user);
  const messagesArray = Object.values(messagesState);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [empty, setEmpty] = useState(true);
  const messagesContainerRef = useRef(null);

  const allChannels = useSelector((state) =>
    state.channels.allChannels ? state.channels.allChannels : {}
  );

  // useEffect(() => {
  //   // open socket connection
  //   // create websocket
  //   socket = io();

  //   socket.on("chat", (chat) => {
  //     setMessages((messages) => [...messages, chat]);
  //   });
  //   // when component unmounts, disconnect
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (currentChannel && messagesArray.length) {
  //     setEmpty(false);
  //     // Scroll to the bottom of the messages container
  //     if (messagesContainerRef.current) {
  //       messagesContainerRef.current.scrollTop =
  //         messagesContainerRef.current.scrollHeight;
  //     }
  //   } else {
  //     setEmpty(true);
  //   }
  // }, [currentChannel, messages]);

  let name;

  let entries = Object.entries(allChannels);
  for (const [key, value] of entries) {
    if (channel_id === value["id"]) {
      name = value["name"];
    }
  }
  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const data = {
  //       content: message,
  //       owner_id: sessionUser.id,
  //     };

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  // const sendChat = async (e) => {
  // e.preventDefault();

  // try {
  //     dispatch(authenticate());
  //     dispatch(
  //       messageStore.sendMessageThunk(currentChannel, {
  //         content: message,
  //         owner_id: sessionUser.id,
  //       })
  //     );
  //     // Send the message
  //     socket.emit("chat", {
  //       content: chatInput,
  //       channel_id: currentChannel,
  //     });
  //     setChatInput("");

  //     // Fetch the updated messages after sending the message
  //     dispatch(messageStore.getchannelMessagesThunk(currentChannel));
  // } catch (error) {
  //     // Handle any errors that occur during message sending or fetching
  //     console.error("Error sending message:", error);
  // }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = {
      content: message,
      owner_id: sessionUser.id,
    };

    try {
      // Send the message
      await dispatch(authenticate());
      await dispatch(messageStore.sendMessageThunk(channel_id, data));

      // Fetch the updated messages after sending the message
      await dispatch(messageStore.getchannelMessagesThunk(channel_id));
      socket.emit("chat", { user: sessionUser.id, content: chatInput });
      setChatInput("");
    } catch (error) {
      // Handle any errors that occur during message sending or fetching
      console.error("Error sending message:", error);
    }
  };
  return (
    <>
      <div id="channel-messages-container" ref={messagesContainerRef}>
        {messages.map((message, ind) => (
          <div key={ind} id="message-container">
            {`${message.user}: ${message.content}`}
          </div>
        ))}
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <button type="button">+</button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${name}`}
          ></input>
        </form>
      </div>
    </>
  );
}
