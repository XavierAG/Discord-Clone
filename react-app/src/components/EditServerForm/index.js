import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServersThunk, editServerThunk } from "../../store/servers";
import OpenModalButton from "../OpenModalButton";
import DeleteServerModal from "../DeleteServerModal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState("");
  console.log('ERRORS:', errors);
  console.log('ERRORS NAME:', errors.name);

  useEffect(() => {
    dispatch(getServersThunk());
  }, []);

  useEffect(() => {
    if (server) {
      setName(server.name);
      setImageUrl(server.image_url);
      setIsPrivate(server.private);
    }
  }, [server]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image_url", imageUrl);
    formData.append("private", isPrivate);
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    try {
      setImageLoading(true);
      const editedServer = await dispatch(editServerThunk(server_id, formData));
      if (editedServer) {
        history.push(`/app/${server_id}`);
      };
      // const editedServer = response;
      // if (editedServer.errors) {
      //   setErrors(editedServer.errors);
      //   setImageLoading(false);
      //   return;
      // }
    } catch (resErr) {
      console.log('CAUGHT ERRORS:', resErr);
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
            onChange={(e) => setImageUrl(e.target.files[0])}
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
