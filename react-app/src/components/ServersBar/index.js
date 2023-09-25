import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authenticate } from "../../store/session";
import * as serverActions from "../../store/servers";
import "./ServersBar.css";

function ServersBar({ isLoaded }) {
  const [server, setEvent] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const allServers = useSelector((state) =>
    state.servers.allServers ? state.servers.allServers : {}
  );
  const servers = Object.values(allServers);

  useEffect(() => {
    dispatch(authenticate());
    dispatch(serverActions.getServersThunk());
  }, [dispatch]);
  console.log("STATE ON SERVER BAR:", servers);

  return (
    <div className="servers-container">
      {servers.map((server) => (
        <div className="server-pics" key={server.id}>
          <a onClick={() => history.push(`servers/${server.id}`)}>
            <img className="server-pic" src={server.image_url} />
          </a>
        </div>
      ))}
    </div>
  );
}

export default ServersBar;
