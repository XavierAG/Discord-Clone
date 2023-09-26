import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";

import * as channelActions from "../../store/channel";

export default function ChannelBar() {
  const dispatch = useDispatch();
  const allChannels = useSelector((state) =>
    state.channels.allChannels ? state.channels.allChannels : {}
  );
  const channels = Object.values(allChannels);

  //   const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(channelActions.getChannelsThunk());
  }, [dispatch]);
  console.log("CHANNELS", channels);
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
