import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ServerDetailPage.css";

export default function ServerDetailPage() {
  const { server_id } = useParams();
  const [serverDetails, setServerDetails] = useState({});

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
      <h1 className="welcome-server"> Welcome to {serverDetails.name?.length > 30 ?
        serverDetails.name.slice(0, 27) + '...' :
        serverDetails.name}</h1>;
    </div>
  );
}
