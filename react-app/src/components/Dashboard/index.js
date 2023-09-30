import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate, logout } from "../../store/session";
import ChannelBar from "../ChannelBar";
import ServersBar from "../ServersBar";
import Chat from "../chat";
import ChannelMessages from "../ChannelMessages";
import MessageForm from "../MessageForm";
import "./index.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { server_id } = useParams();
  const { channel_id } = useParams();

  const dataContainerRef = useRef(null);

  // Authenticate the user
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (dataContainerRef.current) {
      dataContainerRef.current.scrollTop =
        dataContainerRef.current.scrollHeight;
    }
  }, []);

  // Logout button
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => history.push("/"));
  };

  return (
    <div id="dashboard-container">
      {/* Side navbar */}
      <div className="dashboard-serverbar">
        <ServersBar />
      </div>

      <div id="dashboard-columns-container">
        {/* Left column (channel lists, server list buttons) */}
        <div id="column-1-background">
          <div id="placeholder-column-1" className="column-1">
            {server_id ? <ChannelBar /> : <h1>Welcome to Biscord</h1>}
            <button onClick={handleLogout} className="login-logout">
              Log Out
            </button>
          </div>
        </div>

        {/* Right column (messages, public servers list) */}
        <div id="column-2-background">
          <div id="column-2-wrapper">
            <div id="placeholder-column-2" className="scrollable-column">
              {channel_id ? <Chat ref={dataContainerRef} /> : <h1>Friends</h1>}
            </div>
            <div className="message-form"></div>
          </div>
        </div>
        {/* <div id="column-3-background">
          <div id="placeholder-column-3">
            <p>users</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
