import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import * as channelStore from "../../store/channel";
import * as serverStore from "../../store/servers";
import "./UpdateChannel.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function UpdateChannel() {
  const currentServer = useSelector((state) => state.servers.currentServer);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
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
          console.log("this is old data", data);
          if (data && data.channel) {
            setOldData(data.channel);
            const oldChannel = data.channel;
            setName(oldChannel.name);
            setServerId(oldChannel.server_id);
            setisPrivate(oldChannel.private);
          }
        } else {
          console.log(channel_id);
          throw new Error("failed to fetch server data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannel();
  }, [channel_id]);

  const [isPrivate, setisPrivate] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div>
      <form onSubmit={handleSubmit}>
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
