import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as channelStore from "../../store/channel";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function DeleteChannel({ channel_id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push("/app");
    dispatch(channelStore.deleteChannelThunk(channel_id));
    closeModal();
  };

  return (
    <div>
      <h1>Delete Modal</h1>
      <form onSubmit={handleSubmit}>
        <button onClick={closeModal}>Cancel</button>
        <button type="submit">Delete Channel</button>
      </form>
    </div>
  );
}