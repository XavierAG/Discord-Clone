import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getServersThunk, deleteServerThunk } from "../../store/servers";

export default function DeleteServerModal({ server_id }) {

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(deleteServerThunk(server_id))
      .then(() => dispatch(getServersThunk()));
    history.push('/app');
    closeModal();
  };

  return (
    <div className="delete-modal-modal">
      <h1>Delete Server</h1>
      <form
        className='delete-modal-form'
        onSubmit={handleSubmit}
      >
        <button
          className="delete-modal-button"
          type="button"
          onClick={closeModal}
        >Cancel</button>
        <button
          className="delete-modal-button"
          type="submit"
        >Delete</button>
      </form>
    </div>
  )
};
