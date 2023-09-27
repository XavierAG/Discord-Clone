import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, logout } from "../../store/session";
import ChannelBar from "../ChannelList";
import ServersBar from "../ServersBar";
import ChannelMessages from '../ChannelMessages'
import "./index.css";


export default function Dashboard() {
  const dispatch = useDispatch();

  // Get current- server and channel properties from the store
  const currentServer = useSelector(state => (
    state.servers.currentServer
  ));
  const currentChannel = useSelector(state => (
    state.channels.currentChannel
  ));

  // Authenticate the user
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  // Logout button
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div id="dashboard-container">

      {/* Side navbar */}
      <ServersBar />

      <div id="dashboard-columns-container">

        {/* Left column (channel lists, server list buttons) */}
        <div id="column-1-background">
          <div id="placeholder-column-1">
            {currentServer ?
              <ChannelBar serverId={currentServer} /> :
              <h1>Server Name Placeholder</h1>}
            <button onClick={handleLogout} className="login-logout">
              Log Out
            </button>
          </div>
        </div>

        {/* Right column (messages, public servers list) */}
        <div id="column-2-background">
          <div id="placeholder-column-2">
            <ChannelMessages channel_id={currentChannel} />
          </div>
        </div>
      </div>
    </div>
  );
}
