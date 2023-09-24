// Server Consts
const GET_SERVERS = "servers/GET_SERVERS";
const POST_SERVERS = "servers/POST_SERVERS";
const EDIT_SERVERS = "servers/EDIT_SERVERS";
const DELETE_SERVERS = "servers/DELETE_SERVERS";

// Server Actions
const getServers = (servers) => ({
  type: GET_SERVERS,
  servers,
});

export const postServer = (server) => ({
  type: POST_SERVERS,
  server,
});

export const editServer = (server) => ({
  type: EDIT_SERVERS,
  server,
});

export const deleteServer = (serverId) => ({
  type: DELETE_SERVERS,
  serverId,
});

// Server Thunks
// Get all Public Servers
export const getServersThunk = () => async (dispatch) => {
  const res = await fetch("/api/servers");
  const data = await res.json();
  console.log("FETCH RESPONSE:", data);
  dispatch(getServers(data));
  return data;
};

//Create a Server
export const postServerThunk = (server) => async (dispatch) => {
  const res = await fetch("/api/servers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  });
  const data = await res.json();
  dispatch(postServer(data));
  return data;
};

// Edit a server based on its ID
export const editServerThunk = (serverId, server) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  });
  const data = await res.json();
  dispatch(editServer(data));
  return data;
};

// Delete a Server based on its ID
export const deleteServerThunk = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  dispatch(deleteServer(serverId));
  return data;
};

// Intial State
const initialState = { allServers: {} };

// Server Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SERVERS: {
      let allServers = {};
      console.log("ACTION SERVERS:", action.servers);
      const { servers } = action.servers;
      // console.log("servers:", servers);
      servers.forEach((server) => (allServers[server.id] = { ...server }));
      return { allServers: { ...allServers } };
    }
    default:
      return state;
  }
}
