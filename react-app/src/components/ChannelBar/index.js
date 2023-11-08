import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import { NavLink } from "react-router-dom";
import * as channelStore from "../../store/channel";
import OpenModalButton from "../OpenModalButton";
import CreateChannelModal from "../CreateChannelModal";
import "./ChannelBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faGear,
  faHashtag,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use
import { selectChannel } from "../../store/channel";
import EditServerForm from "../EditServerForm";

// Rest of your code

export default function ChannelBar() {
  const dispatch = useDispatch();
  const dropdownRef = useRef();
  // console.log("REF:", dropdownRef);
  const { server_id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const [nav, setNav] = useState(false);
  const [divColor, setDivColor] = useState({});

  // Key into flattened server data for server properties
  const currentServer = useSelector((state) =>
    state.servers.allServers[server_id]
      ? state.servers.allServers[server_id]
      : {}
  );

  const handleCarrotClick = () => {
    setNav(!nav);
  };

  const closeMenu = e => {
    if (!dropdownRef.current?.contains(e.target)) {
      setNav(false);
    };
  };

  useEffect(() => {
    if (!nav) return;
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [nav]);

  const handleChannelClick = (channelId) => {
    dispatch(selectChannel(channelId));
  };

  const handleDivColor = (channelId) => {
    setDivColor((prevColors) => {
      const updatedColors = {};

      // Reset the state for all channels
      Object.keys(prevColors).forEach((id) => {
        updatedColors[id] = false;
      });

      // Toggle the state for the clicked channel
      updatedColors[channelId] = !prevColors[channelId];

      localStorage.setItem("channelColors", JSON.stringify(updatedColors));

      return updatedColors;
    });

    // Call the handleChannelClick function
    handleChannelClick(channelId);
  };

  // Get all channels of the server from the store
  const allChannels = useSelector((state) =>
    state.channels.allChannels ? state.channels.allChannels : {}
  );
  const channels = Object.values(allChannels);

  useEffect(() => {
    // Load the saved channel colors from local storage
    const savedColors = localStorage.getItem("channelColors");
    if (savedColors) setDivColor(JSON.parse(savedColors));
    dispatch(authenticate());
    dispatch(channelStore.getChannelsThunk(server_id));
  }, [dispatch, server_id]);

  if (!sessionUser) {
    return null;
  };

  return (
    <div className="channels-bar-container">
      <div className="server-name">
        <h1>{currentServer.name?.length > 15 ?
          currentServer.name.slice(0, 12) + '...' :
          currentServer.name}</h1>
        {sessionUser.id === currentServer.owner_id && (
          <FontAwesomeIcon
            className="drop-down"
            onClick={handleCarrotClick}
            icon={faCaretDown}
          />
        )}
      </div>
      {/* if carrot is clicked it opens the nav */}
      {nav && (
        <div
          className="server-setting-nav"
          ref={dropdownRef}
        >
          <EditServerForm setNav={setNav} />
        </div>
      )}
      <div id="channel">
        <p id="channel-text">CHANNELS</p>
        {sessionUser.id === currentServer.owner_id && (
          <OpenModalButton
            className="create-channel"
            buttonText={<FontAwesomeIcon icon={faPlus} />}
            modalComponent={<CreateChannelModal server_id={server_id} />}
          />
        )}
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
              <div
                id="inner-channel"
                className={divColor[channel.id] ? "channel-background" : ""}
                onClick={() => handleDivColor(channel.id)}
              >
                <p>
                  <FontAwesomeIcon icon={faHashtag} /> {channel.name.length > 17 ?
                    channel.name.slice(0, 14) + '...' :
                    channel.name}
                </p>
                {sessionUser.id === currentServer.owner_id &&
                  <NavLink
                    className="update-channel-link"
                    exact
                    to={`/${server_id}/${channel.id}`}
                  >
                    <FontAwesomeIcon icon={faGear} />
                  </NavLink>}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
