import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteMessageThunk } from "../../store/messages";
import './index.css';

const DeleteMessageModal = ({ messageId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    const deletedMessage = dispatch(deleteMessageThunk(messageId));
    if (deletedMessage) {
      closeModal();
    }
  };

  return (
    <div id="delete-messsage-modal">
      <h3>Are you sure you want to delete this message?</h3>
      <button
        id="delete-message-button"
        onClick={handleDelete}
      >Delete</button>
    </div>
  );
};

export default DeleteMessageModal;
