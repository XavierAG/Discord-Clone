import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as channelStore from "../../store/channel";
import "./CreateChannelModal.css";
import { useHistory } from "react-router-dom";

export default function CreateChannelModal({ server_id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const history = useHistory();
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Channel name is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
        history.push(`/app/${server_id}/${createdChannel.id}`);
        closeModal();
        return;
      }
    }
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
          <div className="error-container">
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
        </div>
        <div className="private-channel">
          <h3>Private Channel</h3>
          <input
            type="checkbox"
            id="private-checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
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
