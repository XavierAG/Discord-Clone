import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { authenticate } from "../../store/session";
import * as messageStore from "../../store/messages";
import { io } from "socket.io-client";
let socket;

const Chat = () => {
  // setting Chat Input UseState
  const [chatInput, setChatInput] = useState("");
  const [message, setMessage] = useState([]);

  //USER Fetch
  const sessionUser = useSelector((state) => state.session.user);

  // Fetching channel_id from route
  const { channel_id } = useParams();

  //Fetching Channel
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const dispatch = useDispatch();

  //Fetching state for Message
  const messageState = useSelector((state) => state.messages);
  const messagesArray = Object.values(messageState);

  // Manually tracking scroll on the Message-DOM
  const [empty, setEmpty] = useState(true);
  const messagesContainerRef = useRef(null);

  // State for fetching All Channels
  const allChannels = useSelector((state) =>
    state.channels.allChannels ? state.channels.allChannels : {}
  );

  //UseEffect to use Web Sockets
  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("chat", (chat) => {
      setMessage((messages) => [...messages, chat]);
    });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  //Fetching all messages with the Message thunk
  useEffect(() => {
    dispatch(messageStore.getchannelMessagesThunk(currentChannel));
  }, [dispatch, currentChannel]);

  //Keeping Track of new Messages, pushing to the user to user(Scroll-Down)
  useEffect(() => {
    if (currentChannel && messagesArray.length) {
      setEmpty(false);
      // Scroll to the bottom of the messages container
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    } else {
      setEmpty(true);
    }
  }, [currentChannel, messagesArray]);

  // Adding Channnel Name to message Input Field
  let name;

  let entries = Object.entries(allChannels);
  for (const [key, value] of entries) {
    if (channel_id === value["id"]) {
      name = value["name"];
    }
  }

  // updating chat input
  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  //Handling submit
  const sendChat = async (e) => {
    e.preventDefault();
    const messageContent = chatInput; // Create a copy of chatInput
    socket.emit("chat", { user: sessionUser.id, content: messageContent });

    const data = {
      content: messageContent, // Use the copied messageContent
      owner_id: sessionUser.id,
    };

    try {
      // Send the message
      // await dispatch(authenticate());
      await dispatch(messageStore.sendMessageThunk(channel_id, data));

      // Fetch the updated messages after sending the message
      await dispatch(messageStore.getchannelMessagesThunk(channel_id));
      socket.emit("chat", { user: sessionUser.id, content: message });
      setChatInput(""); // Reset chatInput
    } catch (error) {
      // Handle any errors that occur during message sending or fetching
      console.error("Error sending message:", error);
    }
  };

  return (
    sessionUser && (
      <div>
        <div id="channel-messages-container" ref={messagesContainerRef}>
          {messagesArray.map((messages, ind) => (
            <div
              key={ind}
            >{`${sessionUser.username}: ${messages.content}`}</div>
          ))}
        </div>
        <div className="form">
          <form onSubmit={sendChat}>
            <input
              type="text"
              value={chatInput}
              onChange={updateChatInput}
              placeholder={`Message #${name}`}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Chat;
