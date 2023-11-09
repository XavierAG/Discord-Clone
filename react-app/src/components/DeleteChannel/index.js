import React from "react";
import { useDispatch } from "react-redux";
import * as channelStore from "../../store/channel";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function DeleteChannel({ server_id, channel_id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const { server_id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(channelStore.deleteChannelThunk(channel_id));
    history.push(`/app/${server_id}`);
    closeModal();
  };

  return (
    <div className="delete-modal-modal">
      <h1>Delete Channel</h1>
      <form className='delete-modal-form' onSubmit={handleSubmit}>
        <button className="delete-modal-button" onClick={closeModal}>Cancel</button>
        <button className="delete-modal-button" type="submit">Delete</button>
      </form>
    </div>
  );
}
