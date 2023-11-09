import { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, logout } from "../../store/session";
import ChannelBar from "../ChannelBar";
import ServersBar from "../ServersBar";
import Chat from "../chat";
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
  if (!sessionUser) history.push('/');

  const dataContainerRef = useRef(null);

  useEffect(() => {
    dispatch(authenticate());
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
      <section className="dashboard-serverbar">
        <ServersBar />
      </section>

      <div id="dashboard-columns-container">
        {/* Left column (channel lists, server list buttons) */}
        <div id="column-1-background">
          <div id="placeholder-column-1" className="column-1">
            {server_id ? <ChannelBar /> : <WelcomeChannel />}
            <div id="user-name-logout">
              <div className="user-img-and-username">
              {sessionUser && sessionUser.image_url &&
                <div id="user-thumbnail-container">
                  <img
                    id="user-thumbnail"
                    alt="user"
                    src={sessionUser.image_url}
                  />
                </div>}
              {sessionUser && !sessionUser.image_url &&
                <div id="user-thumbnail-alt">
                  <p>{sessionUser.username.slice(0, 1).toUpperCase()}</p>
                </div>}
              {sessionUser && sessionUser.username &&
                <p id="username">{sessionUser.username}</p>
                }
              </div>
              <button onClick={handleLogout} className="logout">
                Log Out
              </button>
            </div>
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
