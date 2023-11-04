import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { authenticate } from "../../store/session";
import DeleteMessageModal from "../DeleteMessageModal";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import * as messageStore from "../../store/messages";
import { io } from "socket.io-client";
import "./index.css";
import EditMessageModal from "../EditmessageModal";
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
let socket;

const Chat = () => {
  // setting Chat Input UseState
  const [chatInput, setChatInput] = useState("");
  const [message, setMessage] = useState([]);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const { closeModal } = useModal();

  //USER Fetch
  const sessionUser = useSelector((state) => state.session.user);

  // Fetching channel_id from route
  const { channel_id } = useParams();
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
      dispatch(messageStore.getchannelMessagesThunk(channel_id));
    });
    //when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, [channel_id]);

  //Fetching all messages with the Message thunk
  useEffect(() => {
    dispatch(messageStore.getchannelMessagesThunk(channel_id));
  }, [dispatch, channel_id]);

  //Keeping Track of new Messages, pushing to the user to user(Scroll-Down)
  // Keeping Track of new Messages, pushing to the user to user(Scroll-Down)
  useEffect(() => {
    if (messagesContainerRef.current) {
      if (messagesArray.length > 0) {
        setEmpty(false);
        // Scroll to the bottom of the messages container
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      } else {
        setEmpty(true);
      }
    }
  }, [messagesContainerRef, messagesArray, message]);

  // Adding Channnel Name to message Input Field
  let name;

  let entries = Object.entries(allChannels);
  for (const [key, value] of entries) {
    if (parseInt(channel_id) === value["id"]) {
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
    const setMessage = chatInput; // Create a copy of chatInput
    const messageContent = chatInput;
    const data = {
      content: messageContent, // Use the copied messageContent
      owner_id: sessionUser.id,
    };

    dispatch(
      messageStore.sendMessageThunk({ channel_id, messageContent, sessionUser })
    );
    socket.emit("chat", { user: sessionUser.id, content: messageContent });
    setChatInput(""); // Reset chatInput
  };

  return (
    sessionUser && (
      <div className="channel-form">
        <div
          id="channel-messages-container"
          className="scrollable-column"
          ref={messagesContainerRef}
        >
          {messagesArray
            .filter((messages) => messages.content) // Filter messages with content
            .map((messages, ind) => (
              <div key={ind} className="message-container">
                <Tooltip
                  title={`Message from ${messages.user.username}`}
                  position="top"
                  trigger="mouseenter"
                  arrow={true}
                  duration={200}
                >
                  <div>
                    {`${messages.user.username}: ${messages.content}`}
                  </div>
                </Tooltip>
                
                {sessionUser.id == messages.owner_id && (
                  <OpenModalButton
                    className="login-logout"
                    buttonText="Delete message"
                    modalComponent={
                      <DeleteMessageModal messageId={messages.id} />
                    }
                  ></OpenModalButton>
                )}
                {sessionUser.id == messages.owner_id && (
                  <OpenModalButton
                    className="login-logout"
                    buttonText="Update Message"
                    modalComponent={
                      <EditMessageModal messageId={messages.id} />
                    }
                  ></OpenModalButton>
                )}
              </div>
            ))}
          <div className="delete-review-button"></div>
        </div>
        <div className="form">
          <form onSubmit={sendChat}>
            <input
              type="text"
              value={chatInput}
              onChange={updateChatInput}
              placeholder={`Message #${name || "channel"}`}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Chat;
