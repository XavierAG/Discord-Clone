import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, logout, deleteUserThunk } from "../../store/session";
import ChannelBar from "../ChannelBar";
import ServersBar from "../ServersBar";
import Chat from "../chat";
import ChannelMessages from "../ChannelMessages";
import MessageForm from "../MessageForm";
import ServerDetailPage from "../ServerDetailPage";
import "./index.css";
import Friends from "../Friends";
import WelcomeChannel from "../WelcomeChannel";

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { server_id } = useParams();
  const { channel_id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

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

  const handleDeleteUser = (e) => {
    e.preventDefault();
    if (sessionUser) {
      dispatch(deleteUserThunk(sessionUser.id)).then(() => history.push("/"));
    } else {
      console.error("Invalid user_id");
    }
  };
  if (!sessionUser) {
    history.push("/");
    return null;
  }

  return (
    <div id="dashboard-container">
      {/* Side navbar */}
      <section className="dashboard-serverbar">
        <ServersBar />
      </section>

      <div id="dashboard-columns-container">
        {/* Left column (channel lists, server list buttons) */}
        <div id="column-1-background">
          <div id="placeholder-column-1" className="column-1">
            {server_id ? <ChannelBar /> : <WelcomeChannel />}
            <button onClick={handleLogout} className="logout">
              Log Out
            </button>
          </div>
        </div>

        {/* Right column (messages, public servers list) */}
        <div id="column-2-background">
          <div id="column-2-wrapper">
            {channel_id ? (
              <Chat ref={dataContainerRef} />
            ) : server_id ? (
              <ServerDetailPage />
            ) : (
              <h1>
                <Friends />
              </h1>
            )}
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
