// Server Consts
const GET_SERVERS = "servers/GET_SERVERS";
const POST_SERVERS = "servers/POST_SERVERS";
// const EDIT_SERVERS = "servers/EDIT_SERVERS";
const DELETE_SERVERS = "servers/DELETE_SERVERS";
const CURRENT_SERVER = "servers/CURRENT_SERVER";

// Server Actions
const getServers = (servers) => ({
  type: GET_SERVERS,
  servers,
});

const postServer = (server) => ({
  type: POST_SERVERS,
  server,
});

// const editServer = (server) => ({
//   type: EDIT_SERVERS,
//   server,
// });

const deleteServer = (serverId) => ({
  type: DELETE_SERVERS,
  serverId,
});

const setCurrentServer = (serverId) => ({
  type: CURRENT_SERVER,
  serverId,
});

// Server Thunks

// Get all Public Servers
export const getServersThunk = () => async (dispatch) => {
  const res = await fetch("/api/servers/");
  const data = await res.json();
  // console.log("FETCH RESPONSE:", data);
  dispatch(getServers(data));
  return data;
};

//Create a Server
export const postServerThunk = (server, newImage) => async (dispatch) => {
  let res;
  if (newImage) {
    res = await fetch("/api/servers/", {
      method: "POST",
      body: server,
    });
  } else {
    res = await fetch("/api/servers/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(server),
    });
  }
  if (res.ok) {
    const data = await res.json();
    // console.log('RES:', data);
    dispatch(postServer(data));
    return data;
  } else {
    const errors = await res.json();
    throw errors;
  }
};

// Edit a server based on its ID
export const editServerThunk =
  (serverId, server, newImage) => async (dispatch) => {
    // console.log('SERVER ID:', serverId);
    // console.log('SERVER:', server);
    console.log("NEW IMG ARG:", newImage);
    let res;
    if (newImage) {
      res = await fetch(`/api/servers/${serverId}`, {
        method: "PUT",
        body: server,
      });
    } else {
      console.log("EDIT DATA", server);
      res = await fetch(`/api/servers/${serverId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(server),
      });
    }
    if (res.ok) {
      const data = await res.json();
      console.log("EDIT RESPONSE:", data);
      dispatch(postServer(data));
      return data;
    } else {
      const errors = await res.json();
      console.log("EDIT ERRORS:", errors);
      throw errors;
    }
  };

export const getServerImage = (imgUrl) => async (dispatch) => {
  console.log("FETCH URL:", imgUrl);
  const res = await fetch(`${imgUrl}`);
  if (res.ok) {
    const img = await res.json();
    console.log("IMAGE FETCH:", img);
    return img;
  } else {
    return null;
  }
};

// Delete a Server based on its ID
export const deleteServerThunk = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log("DELETE RES:", data);
  dispatch(deleteServer(serverId));
  return data;
};

// Set dashboard Server by its id
export const setCurrentServerThunk = (serverId) => async (dispatch) => {
  dispatch(setCurrentServer(serverId));
};

// Intial State
const initialState = { allServers: {} };

// Server Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SERVERS:
      const getAllState = {};
      const { servers } = action.servers;
      servers.map(
        (server) =>
          (getAllState[server.id] = {
            ...server,
            // members: server.members
            //   .map(member => member = { ...member })
          })
      );
      return { allServers: getAllState };
    case POST_SERVERS:
      const postState = {};
      const postAllArr = Object.values(state.allServers);
      postAllArr.map(
        (server) =>
          (postState[server.id] = {
            ...server,
            // members: server.members.map((member) => (member = { ...member })),
          })
      );
      postState[action.server.id] = {
        ...action.server,
        // members: action.server.members
        //   .map
        // // (member) => (member = { ...member })
        // (),
      };
      return {
        allServers: postState,
        currentServer: action.server.id,
      };
    // case EDIT_SERVERS: {
    //   const newState = { ...state };
    //   newState[action.server.id] = action.server;
    //   return newState;
    // }
    case DELETE_SERVERS:
      const deleteState = {};
      const delAllArr = Object.values(state.allServers);
      console.log("ALL SERVERS ARRAY:", delAllArr);
      delAllArr.map(
        (server) =>
          (deleteState[server.id] = {
            ...server,
            // members: server.members.map((member) => (member = { ...member })),
          })
      );
      delete deleteState[action.serverId];
      return deleteState;
    case CURRENT_SERVER:
      const currentServerState = {
        ...state,
        currentServer: action.serverId,
      };
      return currentServerState;
    default:
      return state;
  }
}
