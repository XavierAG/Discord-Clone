import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";

import * as channelActions from "../../store/channel";

export default function ChannelBar() {
  const dispatch = useDispatch();
  const { server_id } = useParams();
  const allChannels = useSelector((state) =>
    state.channels.allChannels ? state.channels.allChannels : {}
  );
  const channels = Object.values(allChannels);
  console.log("CHANNELS", allChannels);

  //   const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate());
    dispatch(channelActions.getChannelsThunk(server_id));
  }, [dispatch]);
  return (
    <div className="channels-container">
      <div className="server-name">
        <h1>Server Name Placeholer</h1>
      </div>
      <div className>
        {channels.map((channel) => (
          <div key={channel.id}>
            <p>{channel.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
