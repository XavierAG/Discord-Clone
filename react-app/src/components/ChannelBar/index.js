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
import { faCaretDown, faGear, faHashtag, faPlus} from '@fortawesome/free-solid-svg-icons'; // Import the specific icon you want to use

// Rest of your code

export default function ChannelBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState([]);
  const [nav, setNav] = useState(false);
  const [divColor, setDivColor] = useState({});
  const { server_id } = useParams();

  // Key into flattened server data for server properties
  const currentServer = useSelector((state) =>
    state.servers.allServers[server_id]
      ? state.servers.allServers[server_id]
      : {}
  );

  const handleCarrotClick = () =>{
    setNav(!nav)
  }

  const handleDivColor = (channelId) => {
    setDivColor((prevColors) => {
      const updatedColors = {};
  
      // Reset the state for all channels
      Object.keys(prevColors).forEach((id) => {
        updatedColors[id] = false;
      });
  
      // Toggle the state for the clicked channel
      updatedColors[channelId] = !prevColors[channelId];
  
      return updatedColors;
    });
  };
  
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
        <FontAwesomeIcon className="drop-down" onClick={handleCarrotClick} icon={faCaretDown} />
      </div>
      {/* if carrot is clicked it opens the nav */}
      {nav && (

      <div className="server-setting-nav">
        <Link
          exact
          to={`/servers/${server_id}/update`}
          className="edit-server"
        >
          Edit Server
        </Link>

      </div>
      )}
      <div id="channel">
        <p id="channel-text">CHANNELS</p>
        <OpenModalButton
          className="create-channel"
          buttonText={<FontAwesomeIcon icon={faPlus} />}
          modalComponent={<CreateChannelModal server_id={server_id} />}
        />

      </div>
      <div className="channels-list-container">
        {channels.map((channel) => (
          <NavLink
            key={channel.id}
            exact
            to={`/app/${server_id}/${channel.id}`}
            className="channel-navlinks"
          >
            <div key={channel.id}>
              <div id="inner-channel"
               className={divColor[channel.id] ? 'channel-background' : ''}
               onClick={() => handleDivColor(channel.id)}>
                <p><FontAwesomeIcon icon={faHashtag} /> {channel.name}</p>
                <NavLink
                  className="update-channel-link"
                  exact
                  to={`/${server_id}/${channel.id}`}
                >
                <FontAwesomeIcon icon={faGear} />
                </NavLink>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
