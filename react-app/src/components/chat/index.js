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
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");

  //USER Fetch
  const sessionUser = useSelector((state) => state.session.user);

  // Fetching channel_id from route
  const { channel_id } = useParams();
  const dispatch = useDispatch();

  //Fetching state for Message
  const messageState = useSelector((state) => state.messages);
  console.log("messagestate", messageState);
  const messagesArray = Object.values(messageState);
  console.log("messageArray", messagesArray);

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
      setMessage([]);
      console.log("UNMOUNTING");
      socket.disconnect();
    };
  }, []);

  //Fetching all messages with the Message thunk
  useEffect(() => {
    dispatch(messageStore.getchannelMessagesThunk(channel_id));
  }, [dispatch, channel_id]);

  //Keeping Track of new Messages, pushing to the user to user(Scroll-Down)
  useEffect(() => {
    if (channel_id && messagesArray.length) {
      setEmpty(false);
      // Scroll to the bottom of the messages container
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    } else {
      setEmpty(true);
    }
  }, [channel_id, messagesArray]);

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
    const messageContent = chatInput;
    console.log("THIS IS MESSAGE SOCKET", messageContent);
    socket.emit("chat", { user: sessionUser.id, content: messageContent });
    setChatInput(""); // Reset chatInput

    const data = {
      content: messageContent, // Use the copied messageContent
      owner_id: sessionUser.id,
    };

    dispatch(
      messageStore.sendMessageThunk({ channel_id, messageContent, sessionUser })
    );
  };
  const editMessage = (messageContent) => {
    setEditedMessage(messageContent);
    setEditMode(false);
  };

  return (
    sessionUser && (
      <div>
        <div id="channel-messages-container" ref={messagesContainerRef}>
          {messagesArray
            .filter((messages) => messages.content)
            .map((messages, ind) => (
              <div key={ind}>
                <div>
                  {`${sessionUser.username}:`}
                  {editMode ? (
                    <input
                      key={ind}
                      type="text"
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                    ></input>
                  ) : (
                    `${messages.content}`
                  )}
                </div>
                <div>
                  {editMode ? (
                    <button onClick={() => editMessage(messages.content)}>
                      submit
                    </button>
                  ) : (
                    <button onClick={() => setEditMode(true)}>EDIT</button>
                  )}
                </div>
              </div>
            ))}
          {message
            .filter((messages) => messages.content)
            .map((messages, ind) => (
              <div key={ind}>
                {`${sessionUser.username}: ${messages.content}`}
              </div>
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
