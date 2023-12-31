import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as channelStore from "../../store/channel";
import OpenModalButton from "../OpenModalButton";
import DeleteChannel from "../DeleteChannel";
import "./UpdateChannel.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function UpdateChannel() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [oldData, setOldData] = useState({});
  const [serverId, setServerId] = useState(null);
  const { server_id, channel_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await fetch(`/api/channels/${channel_id}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.channel) {
            setOldData(data.channel);
            const oldChannel = data.channel;
            setName(oldChannel.name);
            setServerId(oldChannel.server_id);
            setisPrivate(oldChannel.private);
          }
        } else {
          throw new Error("failed to fetch server data");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchChannel();
  }, [channel_id]);

  const [isPrivate, setisPrivate] = useState(false);
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

    const res = await dispatch(
      channelStore.editChannelThunk({
        name,
        channel_id,
        isPrivate,
      })
    );
    if (res) {
      history.push(`/app/${server_id}/${channel_id}`);
    } else {
      console.error("update failed");
    }
  };
  const handleOldData = (e) => {
    setName(e.name);
    setisPrivate(e.private);
  };

  return (
    <div className="update-channel-page">
      <OpenModalButton
        className="login-logout"
        buttonText="Delete Channel"
        modalComponent={
          <DeleteChannel channel_id={channel_id} server_id={serverId} />
        }
      ></OpenModalButton>
      <form onSubmit={handleSubmit} className="update-channel-form">
        {/* Display validation error for channel name */}
        {errors.name && (
          <p className="error-message">
            <span className="error-icon">⚠️</span>
            {errors.name}
          </p>
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setisPrivate(e.target.checked)}
        ></input>
        <button type="button" onClick={() => handleOldData(oldData)}>
          Reset
        </button>
        <button type="submit">Confirm Changes</button>
      </form>
    </div>
  );
}
