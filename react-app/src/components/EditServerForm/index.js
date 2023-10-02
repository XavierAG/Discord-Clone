import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServersThunk, editServerThunk } from "../../store/servers";
import OpenModalButton from "../OpenModalButton";
import DeleteServerModal from "../DeleteServerModal";

export default function EditServerForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { server_id } = useParams();
  const server = useSelector((state) =>
    state.servers.allServers[server_id]
      ? state.servers.allServers[server_id]
      : null
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageInput, setImageInput] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const servers = dispatch(getServersThunk())
  }, []);

  useEffect(() => {
    if (server) {
      setName(server.name);
      setImageUrl(server.image_url);
      setIsPrivate(server.private);
    };
  }, [server]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;
    let newImage;
    if (imageInput) {
      data = new FormData();
      data.append("name", name);
      data.append("image_url", imageInput);
      data.append("private", isPrivate);
      newImage = true;
    } else {
      data = {
        name: name,
        private: isPrivate,
      };
      newImage = false;
    };

    try {
      setImageLoading(true);
      const editedServer = await dispatch(
        editServerThunk(server_id, data, newImage)
      );
      if (editedServer) {
        history.push(`/app/${server_id}`);
      };
    } catch (resErr) {
      console.error(resErr);
      setImageLoading(false);
      if (Array.isArray(resErr.errors)) {
        setErrors({ name: 'Server name is required' })
      } else {
        setErrors({ image: 'Server image is required' });
      };
    };
  };

  return (
    <div>
      <h2>Edit your Server</h2>
      {/* <h1>{errors}</h1> */}
      <OpenModalButton
        className="login-logout"
        buttonText="Delete Server"
        modalComponent={<DeleteServerModal server_id={server_id} />}
      ></OpenModalButton>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          {errors.name ? (
            <label className="error-text" htmlFor="name">
              {errors.name}
            </label>
          ) : (
            <label htmlFor="name">SERVER NAME</label>
          )}
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          {errors.image ? (
            <label className="error-text" htmlFor="name">
              {errors.image}
            </label>
          ) : (
            <label htmlFor="name">SERVER IMAGE</label>
          )}
          <input
            type="file"
            accept="image/*"
            id="image_url"
            name="image_url"
            style={{
              border: 'none',
              // display: 'none',
              // width: '1rem',
              // height: '1rem',
              // background: 'blue'
            }}
            onChange={(e) => {
              setImageInput(e.target.files[0]);
            }}
          />
        </div>
        <div>
          <label htmlFor="private">PRIVATE</label>
          <input
            type="checkbox"
            id="private"
            name="private"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        </div>
        <button type="submit">Update Server</button>
      </form>
      <Link exact to={`/app/${server_id}`}>
        Cancel
      </Link>
    </div>
  );
}
