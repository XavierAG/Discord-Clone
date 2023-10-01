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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon you want to use

// Rest of your code

export default function ChannelBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState([]);
  const [nav, setNav] = useState(false);
  const { server_id } = useParams();

  // Key into flattened server data for server properties
  const currentServer = useSelector((state) =>
    state.servers.allServers[server_id]
      ? state.servers.allServers[server_id]
      : {}
  );

  // Get all channels of the server from the store
  const allChannels = useSelector((state) =>
    state.channels.allChannels ? state.channels.allChannels : {}
  );
  const channels = Object.values(allChannels);
  useEffect(() => {
    dispatch(authenticate());
    dispatch(channelStore.getChannelsThunk(server_id));
  }, [dispatch, server_id]);

  return (
    <div className="channels-bar-container">
      <div className="server-name">
        <h1>{currentServer.name}</h1>
        <FontAwesomeIcon className="drop-down" icon={faCaretDown} />
      </div>
      <div className="server-setting-nav">
        <Link
          exact
          to={`/servers/${server_id}/update`}
          className="edit-server"
        >
          Edit Server
        </Link>

      </div>
      <div className="channel">
        <p>CHANNELS</p>
        <OpenModalButton
          className="create-channel"
          buttonText="+"
          modalComponent={<CreateChannelModal server_id={server_id} />}
        />
      </div>
      <div className="channels-list-container">
        {channels.map((channel) => (
          <a
            key={channel.id}
            href={`/app/${server_id}/${channel.id}`}
            className="channel-navlinks"
          >
            <div key={channel.id}>
              <div>
                <p>{channel.name}</p>
                <NavLink
                  className="update-channel-link"
                  exact
                  to={`/${server_id}/${channel.id}`}
                >
                  Update Channel
                </NavLink>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
