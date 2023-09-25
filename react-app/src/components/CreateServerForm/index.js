// AddServerForm.js
import React, { useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { postServerThunk } from "../../store/servers";


const CreateServerForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  const [serverData, setServerData] = useState({
    name: "",
    image_url: "",
    private: false,
    owner_id: sessionUser.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServerData({ ...serverData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postServerThunk(serverData));
    setServerData({
      name: "",
      image_url: "",
      private: false,
      owner_id: 1,
    });
  };

  return (
    <div>
      <h2>Add a New Server</h2>
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
        <div>
          <label htmlFor="private">Private:</label>
          <input
            type="checkbox"
            id="private"
            name="private"
            checked={serverData.private}
            onChange={() =>
              setServerData({ ...serverData, private: !serverData.private })
            }
          />
        </div>
        <button type="submit">Create Server</button>
      </form>
    </div>
  );
};

export default CreateServerForm;
