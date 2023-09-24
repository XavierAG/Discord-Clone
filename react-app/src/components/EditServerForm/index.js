import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editServerThunk } from "../../store/servers";

export const EditServerForm = (serverData) => {
  const dispatch = useDispatch();
  const [server, setServer] = useState(serverData);

  useEffect(() => {
    // Log the serverData for debugging
    console.log("serverData:", serverData);

    // Check if serverData is defined and not empty before setting it
    if (serverData && Object.keys(serverData).length > 0) {
      setServer(serverData);
    }
  }, [serverData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServer({ ...server, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the editServerThunk action with the updated server data
    dispatch(editServerThunk(server.id, server));
  };

  return (
    <div>
      <h2>Edit Server</h2>
      <form onSubmit={handleSubmit}>
        {/* Add your input fields here */}
        <div>
          <label htmlFor="name">Server Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={server.name || ""}
            onChange={handleInputChange}
          />
        </div>
        {/* Add more input fields as needed */}
        <button type="submit">Update Server</button>
      </form>
    </div>
  );
};

export default EditServerForm;
