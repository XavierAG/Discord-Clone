import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { editMessageThunk } from "../../store/messages";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditMessageModal = ({ messageId }) => {
  const dispatch = useDispatch();
  const { channel_id } = useParams();
  const message = useSelector((state) => state.messages[messageId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [content, setContent] = useState(message.content);
  const [channelId, setChannelId] = useState(message.channel_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedMessage = {
      content: content,
      channel_id: channelId, // Include the channel ID
    };
    await dispatch(editMessageThunk(editedMessage));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Content:
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label>
        Channel ID:
        <input
          type="text"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
        />
      </label>
      <button type="submit">Edit Message</button>
    </form>
  );
};

export default EditMessageModal;
