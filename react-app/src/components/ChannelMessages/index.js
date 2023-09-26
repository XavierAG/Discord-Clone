import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";

import * as messageStore from "../../store/messages";

export default function ChannelMessages() {
  const { channel_id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const messagesState = useSelector(state => state.messages);
  // console.log("STATE:", messagesState);
  const messages = Object.values(messagesState);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate());
    dispatch(messageStore.getchannelMessagesThunk(channel_id))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return null;

  return (
    <div id="channel-messages-container">
      {messages.map((message) => (
        <div
          key={message.id}
          id='message-container'
        >
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}
