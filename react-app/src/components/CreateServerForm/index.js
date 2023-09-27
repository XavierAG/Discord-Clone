// AddServerForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postServerThunk } from "../../store/servers";

const CreateServerForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [serverData, setServerData] = useState({
    name: "",
    image_url: "",
    private: false,
    owner_id: sessionUser.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image_url", imageUrl);
    formData.append("name", name);
    formData.append("private", isPrivate);
    formData.append("owner_id", sessionUser.id);
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    dispatch(postServerThunk(serverData));
  };

  return (
    <div>
      <h2>Add a New Server</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Server Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={serverData.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="file"
            accept="image/*"
            id="image_url"
            name="image_url"
            value={serverData.image_url}
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="private">Private:</label>
          <input
            type="checkbox"
            id="private"
            name="private"
            checked={serverData.private}
            onChange={(e) => setIsPrivate(e.target.value)}
          />
        </div>
        <button type="submit">Create Server</button>
        (imageLoading)&& <p>Loading...</p>
      </form>
    </div>
  );
};

export default CreateServerForm;
