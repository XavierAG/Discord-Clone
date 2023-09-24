import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editServerThunk } from "../../store/servers";

export const EditServerForm = () => {
  const { serverId } = useParams();
  console.log('PARAM:', serverId)
  const serverData = {}
  const dispatch = useDispatch();

  return (
    // <div>
    //   <h2>Edit Server</h2>
    //   <form onSubmit={handleSubmit}>
    //     {/* Add your input fields here */}
    //     <div>
    //       <label htmlFor="name">Server Name:</label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={server.name || ""}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     {/* Add more input fields as needed */}
    //     <button type="submit">Update Server</button>
    //   </form>
    // </div>
    <>
    </>
  );
};

export default EditServerForm;
