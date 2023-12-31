import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import CreateServerForm from "../CreateServerForm";
import * as serverActions from "../../store/servers";
import * as channelActions from "../../store/channel";
import biscordLogo from '../../assets/images/biscord-logo-original.png'
import compassLogo from '../../assets/images/biscord-compass-logo.png'
import "./ServersBar.css";

export default function ServersBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Get servers from state
  const allServers = useSelector((state) =>
    state.servers.allServers ? state.servers.allServers : {}
  );
  const servers = Object.values(allServers);

  // Authenticate the user then fetch the servers list
  useEffect(() => {
    dispatch(authenticate()).then(dispatch(serverActions.getServersThunk()));
  }, [dispatch]);

  // Add or replace a current-server property in the store
  // then dump current-channel state
  let channels;
  const handleServerClick = async (serverId) => {
    await dispatch(channelActions.setCurrentChannelThunk(null));
    await dispatch(serverActions.setCurrentServerThunk(serverId));
    const { channels } = await dispatch(channelActions.getChannelsThunk(serverId));
    const channelId = channels[0]?.id;
    if (channels.length) history.push(`/app/${serverId}/${channels[0].id}`);
  };

  return (
    <nav className="servers-container servers-scrollable-column">
      {/* Home or eventual direct messages link */}

      <div className="logo-container">
        <NavLink to="/app">
          <img
            alt="discord"
            className="dis-logo"
            src={biscordLogo}
          />
        </NavLink>
      </div>

      <div className="seperator"></div>

      {/* Mapped server navlinks dispatch to store */}

      {servers.map((server) => (
        <div className="server-pics" key={server.id}>
          <NavLink
            exact
            to={`/app/${server.id}`}
            className="server-tag"
            onClick={() => handleServerClick(server.id)}
          >
            {server.image_url ?
              <img alt={server.name} className="server-pic" src={server.image_url} /> :
              (
                <p className="server-letter">{server.name[0].toUpperCase()}</p>
              )}

          </NavLink>
        </div>
      ))}

      {/* Eventual open create-server modal link */}

      <OpenModalButton
        // id="server-modal"
        buttonText="+"
        modalComponent={<CreateServerForm />}
      ></OpenModalButton>

      {/* Eventual link to mount public servers list */}

      <div className="find-servers">
        <NavLink to="/servers">
          <img
            alt="all servers"
            className="under-server-pic"
            src={compassLogo}
          />
        </NavLink>
      </div>
    </nav>
  );
}
