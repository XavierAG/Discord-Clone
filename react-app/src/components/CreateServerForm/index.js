// AddServerForm.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postServerThunk } from "../../store/servers";
import { useModal } from "../../context/Modal";

const CreateServerForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { closeModal } = useModal()
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState('');
  let errorsObj = {};
  if (errors.length) {
    errors.forEach(err => {
      const [key, val] = err.split(' : ');
      errorsObj[key] = val;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image_url", imageUrl);
    formData.append("private", isPrivate);
    formData.append("owner_id", sessionUser.id);
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    // console.log("FORM DATA", formData);
    let createdServer;
    try {
      setImageLoading(true);
      createdServer = await dispatch(postServerThunk(formData));
      history.push(`/app/${createdServer.id}`);
      closeModal();
    } catch ({ errors }) {
      setImageLoading(false);
      setErrors(errors);
    };
  };

  return (
    <div>
      <h2>Add a New Server</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          {errorsObj.name ?
            <label
              className="error-text"
              htmlFor="name"
            >Server name is required</label> :
            <label htmlFor="name">Server Name:</label>}
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          {errorsObj.image_url ?
            <label
              className="error-text"
              htmlFor="name"
            >Server image is required</label> :
            <label htmlFor="name">Server image</label>}
          <input
            type="file"
            accept="image/*"
            id="image_url"
            name="image_url"
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="private">Private:</label>
          <input
            type="checkbox"
            id="private"
            name="private"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        </div>
        <button type="submit">Create Server</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default CreateServerForm;
