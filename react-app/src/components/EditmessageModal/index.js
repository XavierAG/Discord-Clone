import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editMessageThunk } from "../../store/messages";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './index.css';

const EditMessageModal = ({ messageId }) => {
  const dispatch = useDispatch();
  const { channel_id } = useParams();
  const { closeModal } = useModal();
  const message = useSelector((state) => state.messages[messageId]);
  const [content, setContent] = useState("");
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
    <form
      id="update-message-form"
      onSubmit={handleSubmit}
    >
      {errors.content ? (
        <label className="error-text" htmlFor="content">
          {errors.content}
        </label>
      ) : null}
      <input
        id="update-message-input"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        id="update-message-submit"
        type="submit"
      ><i className="fas fa-pen" /></button>
    </form>
  );
};

export default EditMessageModal;
