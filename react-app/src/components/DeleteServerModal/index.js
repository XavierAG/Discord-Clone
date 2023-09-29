import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteServerThunk } from "../../store/servers";

export default function DeleteServerModal({ server_id }) {
  // const { server_id } = useParams();
  console.log('PARAM:', server_id);
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    history.push('/app');
    dispatch(deleteServerThunk(server_id))
    closeModal();
  };

  return (
    <div>
      <h1>Delete Modal</h1>
      <form
        onSubmit={handleSubmit}
      >
        <button
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
