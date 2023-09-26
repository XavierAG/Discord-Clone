import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import * as serverActions from "../../store/servers";
import "./ServersBar.css";

function ServersBar({ isLoaded }) {
  const [server, setEvent] = useState([]);
  const dispatch = useDispatch();
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
      <div className="logo-container">
        <a href="/servers">
          <img
            className="dis-logo"
            src="https://cdn.dribbble.com/userupload/5474438/file/original-c32ac002bd40c155894b9396d5d907db.jpg"
          />
        </a>
      </div>
      <div className="seperator"></div>
      {servers.map((server) => (
        <div className="server-pics" key={server.id}>
          <a href={`servers/${server.id}`}>
            <img className="server-pic" src={server.image_url} />
          </a>
        </div>
      ))}
      <div className="create-server">
        <a href="servers/create">
          <img
            className="under-server-pic"
            src="https://images-na.ssl-images-amazon.com/images/S/influencer-profile-image-prod/logo/thebetterhave_1623197557096_original._CR0,0,4167,4167_._FMjpg_.png"
          />
        </a>
      </div>
      <div className="find-servers">
        <a href="servers/create">
          <img
            className="under-server-pic"
            src="https://sb.blackink.ai/storage/v1/object/public/creations/db78e901-3522-49ee-9b3a-25f0fd470268/0aaf6ab5-056b-4c06-9bd3-7fb594d7dcf3_0.webp"
          />
        </a>
      </div>
    </div>
  );
}

export default ServersBar;
