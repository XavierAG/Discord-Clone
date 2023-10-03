import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/servers";
import "./ServerDetailPage.css";

export default function ServerDetailPage() {
  const { server_id } = useParams();
  const [serverDetails, setServerDetails] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchServerDetails = async () => {
      const response = await fetch(`/api/servers/${server_id}`);
      const data = await response.json();
      setServerDetails(data.server);
    };
    fetchServerDetails();
  }, [server_id]);

  return (
    <div className="server-details-page">
      <h1 className="welcome-server"> Welcome to {serverDetails.name}</h1>;
    </div>
  );
}
