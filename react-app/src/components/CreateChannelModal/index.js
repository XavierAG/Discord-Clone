import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as channelStore from "../../store/channel";
import "./CreateChannelModal.css";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function CreateChannelModal({ server_id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const history = useHistory();

  const [isPrivate, setisPrivate] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      channelStore.postChannelThunk({
        name,
        server_id,
        isPrivate,
      })
    );
    if (response) {
      const createdChannel = response;
      if (createdChannel.errors) {
        setErrors(createdChannel.errors);
        return;
      }
      if (createdChannel) {
        dispatch(channelStore.addChannelToStore(createdChannel));
        closeModal();
        history.push(`/app/${server_id}/${createdChannel.id}`);
        return;
      }
    }
    // .catch(async (res) => {
    //     const data = await res.json()
    //     if (data && data.errors) setErrors(data.errors)
    //     return data
    // })
  };
  return (
    <div>
      <h2>Create Channel</h2>
      <form onSubmit={handleSubmit}>
        <div className="channel-name">
          <h3>Channel Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="# new-channel"
          ></input>
        </div>
        <div className="private-channel">
          <h3>Private Channel</h3>
          <input
            type="checkbox"
            id="private-checkbox"
            checked={isPrivate}
            onChange={(e) => setisPrivate(e.target.checked)}
          ></input>
        </div>
        <div className="channel-buttons">
          <button id="cancel-button" onClick={closeModal}>
            Cancel
          </button>
          <button id="create-channel-button" type="submit">
            Create Channel
          </button>
        </div>
      </form>
    </div>
  );
}
