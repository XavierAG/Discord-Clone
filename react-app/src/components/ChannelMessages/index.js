import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as messageStore from "../../store/messages";
import "./index.css";

export default function ChannelMessages() {
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const messagesState = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const messages = Object.values(messagesState);

  const [empty, setEmpty] = useState(true);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    dispatch(messageStore.getchannelMessagesThunk(currentChannel));
  }, [dispatch, currentChannel]);

  useEffect(() => {
    if (currentChannel && messages.length) {
      setEmpty(false);
      // Scroll to the bottom of the messages container
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    } else {
      setEmpty(true);
    }
  }, [currentChannel, messages]);

  const channelData = (
    <div id="channel-messages-container" ref={messagesContainerRef}>
      {messages.map((message, ind) => (
        <div key={message.id} id="message-container">
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
  // come back later// JIMMY JASHAN
  const placeholder = <h1>Message your friends here!</h1>;

  return empty ? placeholder : channelData;
}
