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
    <div>
      <h1>Delete Modal</h1>
      <form
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
        >
          Delete Server
        </button>
      </form>
    </div>
  )
};
