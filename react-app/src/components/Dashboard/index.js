import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, logout } from "../../store/session";
import ServersBar from "../ServersBar";
import ChannelMessages from '../ChannelMessages'
import './index.css'


export default function Dashboard() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate())
      .then(() => setIsLoaded(true));
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
            <h1>Column One PlaceHolder</h1>
            <button
              onClick={handleLogout}
              className="login-logout"
            >
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
  )
};
