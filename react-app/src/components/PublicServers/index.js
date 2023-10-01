import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import ServerSearch from "../ServerSearch";
import ServersBar from "../ServersBar";
import * as serverActions from "../../store/servers";
import './index.css';

export default function PublicServers() {
  const dispatch = useDispatch();
  const allServers = useSelector((state) =>
    state.servers.allServers ? state.servers.allServers : {}
  );
  // console.log("STATE:", allServers);
  const servers = Object.values(allServers);
  console.log("SERVERS:", servers);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate());
    dispatch(serverActions.getServersThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return null;

  return (
    <div id="dash-pub-serv-page">
      <nav className="dashboard-serverbar">
        <ServersBar />
      </nav>
      <div id="dash-pub-serv-container">
        <section id="serv-seach-section">
          <ServerSearch />
        </section>
        <section id="dash-pub-serv-list">
          {servers.map((server) => (
            <div className="pub-serv-element" key={server.id}>
              <img className="pub-img" src={server.image_url} />
              <h1>{server.name}</h1>
              {/* <p>{server.private ? "Private" : "Public"}</p> */}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
