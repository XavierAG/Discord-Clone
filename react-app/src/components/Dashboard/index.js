import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, logout } from "../../store/session";
import ChannelBar from "../ChannelList";
import ServersBar from "../ServersBar";
import "./index.css";
import ChannelMessages from '../ChannelMessages'



export default function Dashboard() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div id="dashboard-container">
      <ServersBar />
      <div id="dashboard-columns-container">
        <div id="column-1-background">
          <div id="placeholder-column-1">
            <ChannelBar />
            <button onClick={handleLogout} className="login-logout">
              Log Out
            </button>
          </div>
        </div>
        <div id="column-2-background">
          <div id="placeholder-column-2">
            <ChannelMessages channel_id={1}/>
          </div>
        </div>
      </div>
    </div>
  );
}
