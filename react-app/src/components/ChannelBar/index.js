import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import { NavLink } from "react-router-dom";
import * as channelStore from "../../store/channel";
import * as messageStore from "../../store/messages";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelModal";
import "./ChannelBar.css";
import UpdateChannel from "../UpdateChannel";

export default function ChannelBar({ serverId }) {
  const dispatch = useDispatch();

  // Key into flattened server data for server properties
  const currentServer = useSelector((state) =>
    state.servers.allServers[serverId] ? state.servers.allServers[serverId] : {}
  );

  // Get all channels of the server from the store
  const allChannels = useSelector((state) =>
    state.channels.allChannels ? state.channels.allChannels : {}
  );
  const channels = Object.values(allChannels);

  // Dispatch get server channels fetch to the store
  useEffect(() => {
    dispatch(authenticate());
    dispatch(channelStore.getChannelsThunk(serverId));
  }, [dispatch, serverId]);

  // Add or replace current channel id in store property
  // then dispatch load messages by that channel's id
  const [channelId, setChannelId] = useState(null);

  const handleChannelClick = async (channelId) => {
    dispatch(channelStore.setCurrentChannelThunk(channelId))
      .then(dispatch(messageStore.getchannelMessagesThunk(channelId)))
      .then(() => setChannelId(channelId));
  };

  return (
    <div className="channels-bar-container">
      <div className="server-name">
        <h1>{currentServer.name}</h1>
      </div>
      <div className="channel">
        <p>CHANNELS</p>
        <OpenModalButton
          className="create-channel"
          buttonText="+"
          modalComponent={<CreateChannelModal />}
        />
      </div>
      <div className="channels-list-container">
        {channels.map((channel) => (
          <NavLink
            key={channel.id}
            to={`/app/${serverId}/${channel.id}`}
            className="channel-navlinks"
            onClick={() => handleChannelClick(channel.id)}
          >
            <div key={channel.id}>
              <div>
                <p>{channel.name}</p>
                <NavLink exact to={`/${channel.id}`}>
                  gear
                </NavLink>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}