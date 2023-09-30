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
  const [imageInput, setImageInput] = useState('');
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    let data;
    let newImage;
    if (imageInput) {
      data = new FormData();
      data.append("name", name);
      data.append("image_url", imageInput);
      data.append("private", isPrivate);
      data.append("owner_id", sessionUser.id);
      newImage = true;
    } else {
      data = {
        name: name,
        private: isPrivate,
        owner_id: sessionUser.id
      };
      newImage = false;
    };

    let createdServer;
    try {
      setImageLoading(true);
      createdServer = await dispatch(postServerThunk(data, newImage));
      history.push(`/app/${createdServer.id}`);
      closeModal();
    } catch (errRes) {
      console.log('CAUGHT ERRORS:', errRes);
      setImageLoading(false);
      if (Array.isArray(errRes.errors)) {
        let errorsObj = {}
        errRes.errors.forEach(err => {
          const [key, val] = err.split(' : ');
          errorsObj[key] = val;
        });
        setErrors(errorsObj);
      } else {
        setErrors({ image: 'There was an error uploading the image' });
      };
    };
  };

  return (
    <div>
      <h2>Add a New Server</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          {errors.name
            ?
            <label
              className="error-text"
              htmlFor="name"
            >Server name is required</label>
            :
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
          {errors.image
            ?
            <label
              className="error-text"
              htmlFor="name"
            >{errors.image}</label>
            :
            <label htmlFor="name">Server image</label>}
          <input
            type="file"
            accept="image/*"
            id="image_url"
            name="image_url"
            onChange={(e) => setImageInput(e.target.files[0])}
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
