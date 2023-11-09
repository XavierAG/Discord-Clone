import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServersThunk, editServerThunk } from "../../store/servers";
import OpenModalButton from "../OpenModalButton";
import DeleteServerModal from "../DeleteServerModal";
import './index.css';

export default function EditServerForm({ setNav }) {
  const dispatch = useDispatch();
  const { server_id } = useParams();
  const server = useSelector((state) =>
    state.servers.allServers[server_id]
      ? state.servers.allServers[server_id]
      : null
  );
  // const [imageLoading, setImageLoading] = useState(false);
  const [name, setName] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const [imageInput, setImageInput] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    dispatch(getServersThunk())
  }, [dispatch]);

  useEffect(() => {
    if (server) {
      setName(server.name);
      // setImageUrl(server.image_url);
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
      // setImageLoading(true);
      const editedServer = await dispatch(
        editServerThunk(server_id, data, newImage)
      );
      if (editedServer) {
        // setNavProp(!nav);
        // history.push(`/app/${server_id}`);
        setNav(false);
      };
    } catch (resErr) {
      console.error(resErr);
      // setImageLoading(false);
      if (Array.isArray(resErr.errors)) {
        setErrors({ name: 'Server name is required' })
      } else {
        setErrors({ image: 'Server image is required' });
      };
    };
  };

  return (
    <div id='edit-server-component'>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="edit-server-form"
      >
        <section className="edit-server-item">
          {errors.image ? (
            <label className="error-text" htmlFor="name">
              {errors.image}
            </label>
          ) : (
            <label
              htmlFor="name"
              className="edit-server-label"
            >Server Image</label>
          )}
          <input
            type="file"
            accept="image/*"
            id="image_url"
            name="image_url"
            style={{
              border: 'none',
            }}
            onChange={(e) => {
              setImageInput(e.target.files[0]);
            }}
          />
        </section>
        <section className="edit-server-item">
          {errors.name
            ?
            <label
              className="error-text"
              htmlFor="edit-server-name"
            >{errors.name}</label>
            :
            <label
              htmlFor="edit-server-name"
              className="edit-server-label"
            >Server Name</label>}
          <input
            type="text"
            id="edit-server-name"
            name="name"
            // className="edit-server-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </section>
        <section id="edit-server-private-container">
          <input
            type="checkbox"
            id="private"
            name="private"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          <label
            htmlFor="private"
            className="edit-server-label"
          >Private</label>
        </section>
        <button
          type="submit"
          className="server-submit"
          id="edit-server-submit"
        >Update Server</button>
      </form>
      {/* <button onClick={() => setNav(false)}>
        Cancel
      </button> */}
      <section>
        <OpenModalButton
          className="delete-server-button"
          buttonText="Delete Server"
          modalComponent={<DeleteServerModal server_id={server_id} />}
        ></OpenModalButton>
      </section>
    </div>
  );
}
