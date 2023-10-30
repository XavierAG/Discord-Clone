import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, useModal } from "../../context/Modal";
import { editMessageThunk } from "../../store/messages";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditMessageModal = ({ messageId }) => {
  const dispatch = useDispatch();
  const { channel_id } = useParams();
  const { closeModal } = useModal();
  const message = useSelector((state) => state.messages[messageId]);
  console.log("messageState", message);
  console.log("messageId", messageId);
  const sessionUser = useSelector((state) => state.session.user);
  const [content, setContent] = useState("");
  const [channelId, setChannelId] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (message) {
      setContent(message.content);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedMessage = {
      content: content,
      channel_id: channel_id, // Include the channel ID
    };
    try {
      await dispatch(editMessageThunk(messageId, editedMessage));
      closeModal();
    } catch (e) {
      setErrors({ content: "Content is required" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.content ? (
        <label className="error-text" htmlFor="content">
          {errors.content}
        </label>
      ) : null}
      <input
        id="content"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Edit Message</button>
    </form>
  );
};

export default EditMessageModal;
