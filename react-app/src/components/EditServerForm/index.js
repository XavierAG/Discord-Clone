// AddServerForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editServerThunk } from "../../store/servers";

const EditServerForm = () => {
  const dispatch = useDispatch();
  const [serverData, setServerData] = useState({
    name: "",
    image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServerData({ ...serverData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editServerThunk(serverData));
    setServerData({
      name: "",
      image_url: "",
    });
  };

  return (
    <div>
      <h2>Edit Server</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Server Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={serverData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={serverData.image_url}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Server</button>
      </form>
    </div>
  );
};

export default EditServerForm;
