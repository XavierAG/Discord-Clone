// AddServerForm.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postServerThunk } from "../../store/servers";
import { useModal } from "../../context/Modal";
import { createServerCaption } from "../../assets/helpers/block-text";
import './index.css';

const CreateServerForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const { closeModal } = useModal()
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [imageInput, setImageInput] = useState('');
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
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
        owner_id: sessionUser.id,
      };
      newImage = false;
    }

    let createdServer;

    try {
      setImageLoading(true);
      createdServer = await dispatch(postServerThunk(data, newImage));
      history.push(`/app/${createdServer.id}`);
      closeModal();
    } catch (errRes) {
      setImageLoading(false);

      if (errRes.errors && Array.isArray(errRes.errors)) {
        // Handle array of errors
        let errorsObj = {};
        errRes.errors.forEach((err) => {
          if (typeof err === "string") {
            const [key, val] = err.split(" : ");
            errorsObj[key] = val;
          }
        });
        setErrors(errorsObj);
      } else if (errRes.errors && typeof errRes.errors === "string") {
        // Handle single error as a string
        setErrors({ image: errRes.errors });
      } else {
        // Handle other types of errors
        console.error("Unhandled error:", errRes);
      }
    }
  };


  return (
    <>
      <div id="create-server-container">
        <h2
          id="create-server-heading"
        >Customize your server</h2>
        <p id="create-server-caption"
        >{createServerCaption.slice(0, 59)}</p>
        <form
          id="create-server-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <section id="server-img-section">
            <div id="img-upload-container">
              <input
                type="file"
                accept="image/*"
                id="image_url"
                name="image_url"
                onChange={(e) => setImageInput(e.target.files[0])}
              />
              {imageLoading &&
                <p
                  className="create-server-item"
                >LOADING...</p>}
              {errors.image
                ?
                <label
                  className="error-text"
                  htmlFor="name"
                >{errors.image}</label>
                :
                <label
                  className="create-server-item"
                  htmlFor="name">SERVER IMAGE</label>}
            </div>
          </section>
          <section id="server-form-section">
            {errors.name
              ?
              <label
                className="error-text"
                htmlFor="name"
              ><span
                className="err-str"
              >SERVER NAME -</span>
                <span
                  className="err-sub-str"
                >Server name is required</span></label>
              :
              <label
                htmlFor="name"
                className="create-server-item"
              >SERVER NAME</label>}
            <input
              className="create-server-input"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </section>
          <section id="server-private-section">
            <label
              className="create-server-item"
              htmlFor="private"
            >PRIVATE</label>
            <input
              type="checkbox"
              id="server-private"
              name="private"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          </section>
        </form>
      </div>
      <div id="server-submit-container">
        <button
          id="create-server-back"
          onClick={closeModal}
        >Back</button>
        <button
          className="server-submit"
          type="submit"
          form='create-server-form'
        >Create</button>
      </div>
    </>
  );
};

export default CreateServerForm;
