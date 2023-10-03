import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import ServerSearch from "../ServerSearch";
import ServersBar from "../ServersBar";
import * as serverActions from "../../store/servers";
import "./index.css";
import { Link } from "react-router-dom";

export default function PublicServers() {
  const dispatch = useDispatch();
  const allServers = useSelector((state) =>
    state.servers.allServers ? state.servers.allServers : {}
  );
  const servers = Object.values(allServers);

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
          {/* <ServerSearch /> */}
        </section>
        <section id="dash-pub-serv-list">
          {servers.map((server) => (
            <Link
              className='public-server-link'
              exact to={`/app/${server.id}`}>
              <div className="pub-serv-element" key={server.id}>
                <img className="pub-img" src={server.image_url} />
                <h1 className="server-find-name">{server.name}</h1>
                {/* <p>{server.private ? "Private" : "Public"}</p> */}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
