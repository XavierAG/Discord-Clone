// Channel Consts

const GET_CHANNELS = "servers/GET_CHANNELS";
const POST_CHANNEL = "servers/POST_CHANNEL";
const EDIT_CHANNEL = "servers/EDIT_CHANNEL";
const DELETE_CHANNEL = "servers/DELETE_CHANNEL";
const CURRENT_CHANNEL = "servers/CURRENT_CHANNEL";
const ADD_CHANNEL_TO_STORE = "ADD_CHANNEL_TO_STORE";

// Channel Actions
const getChannels = (channels) => ({
  type: GET_CHANNELS,
  channels,
});
export const postChannel = (channel) => ({
  type: POST_CHANNEL,
  channel,
});
export const editChannel = (channel) => ({
  type: EDIT_CHANNEL,
  channel,
});
export const deleteChannel = (channel) => ({
  type: DELETE_CHANNEL,
  channel,
});

const setCurrentChannel = (channelId) => ({
  type: CURRENT_CHANNEL,
  channelId,
});

export const addChannelToStore = (channel) => ({
  type: ADD_CHANNEL_TO_STORE,
  channel,
})


//Channel Thunks

// Get all Channels
export const getChannelsThunk = (server_id) => async (dispatch) => {
  const res = await fetch(`/api/servers/${server_id}/channels`);
  const data = await res.json();
  dispatch(getChannels(data));
  return data;
};

// Adding a new Channel based on serverId
export const postChannelThunk = (channel) => async (dispatch) => {
  const { name, server_id, isPrivate } = channel;
  const res = await fetch(`/api/servers/${server_id}/channels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      server_id,
      private: isPrivate,
    }),
  });
  const data = await res.json();
  dispatch(postChannel(data));
  return data;
};

//Edit a Channel based on its Id
export const editChannelThunk = (channel) => async (dispatch) => {
  const { name, channel_id, isPrivate } = channel;
  console.log("name:", name);
  const res = await fetch(`/api/channels/${channel_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      channel_id,
      private: isPrivate,
    }),
  });

  const data = await res.json();
  dispatch(editChannel(data));
  return data;
};

//Delete Channel based on its Id
export const deleteChannelThunk = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  dispatch(deleteChannel(channelId));
  return data;
};

// Set dashboard Channel by its id
export const setCurrentChannelThunk = (channelId) => async (dispatch) => {
  dispatch(setCurrentChannel(channelId));
};

// Channels Reducer

const initialState = {
  allChannels: {},
  currentChannel: null, // Initially, no channel is selected
  selectedChannel: null, // To keep track of the currently selected channel
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNELS: {
      let allChannels = {};
      const { channels } = action.channels;
      channels.forEach((channel) => (allChannels[channel.id] = { ...channel }));
      return { allChannels: { ...allChannels } };
    }
    case POST_CHANNEL: {
      return { ...state, [action.channel.id]: action.channel };
    }
    case EDIT_CHANNEL: {
      const newState = { ...state };
      newState[action.channel.id] = action.channel;
      return newState;
    }
    case DELETE_CHANNEL: {
      const deleteChannel = { ...state };
      delete deleteChannel[action.channelId];
      return deleteChannel;
    }
    case CURRENT_CHANNEL:
      const currentChannelState = {
        ...state,
        currentChannel: action.channelId,
      };
      return currentChannelState;
    case ADD_CHANNEL_TO_STORE:
      const newChannel = action.channel;
      return {
        ...state,
        allChannels: {
          ...state.allChannels,
          [newChannel.id]: newChannel,
        },
      };
      case "SELECT_CHANNEL":
      return {
        ...state,
        selectedChannel: action.channelId,
      };
    default:
      return state;
  }
}
