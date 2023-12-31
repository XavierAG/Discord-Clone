// Constants
const GET_MESSAGES = "messages/GET_MESSAGES";
const SEND_MESSAGE = "messages/SEND_MESSAGE";
const EDIT_MESSAGE = "messages/EDIT_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";
const ADD_MESSAGE_TO_STORE = "ADD_MESSAGE_TO_STORE";

// Action creators
const getChannelMessages = (messages) => ({
  type: GET_MESSAGES,
  messages,
});

const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  message,
});

const editMessage = (message) => ({
  type: EDIT_MESSAGE,
  message,
});

const deleteMessage = (messageId) => ({
  type: DELETE_MESSAGE,
  messageId,
});
export const addMessageToStore = (message) => ({
  type: ADD_MESSAGE_TO_STORE,
  message,
});

// Thunks
//
// Get all Messages for a Channel
export const getchannelMessagesThunk = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channelId}/messages`);
  const data = await res.json();
  dispatch(getChannelMessages(data));
  return data;
};

// Send a Message based on Channel id
export const sendMessageThunk = (data) => async (dispatch) => {
  const { channel_id, messageContent, sessionUser } = data;
  try {
    const res = await fetch(`/api/channels/${channel_id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: messageContent,
        channel_id,
        owner_id: sessionUser.id,
      }),
    });
    const message = await res.json();
    dispatch(sendMessage(message));
    return message;
  } catch (error) {
    throw error;
  }
};

// Edit a Message based on its id
export const editMessageThunk = (messageId, data) => async (dispatch) => {
  const res = await fetch(`/api/messages/${messageId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const message = await res.json();
    dispatch(editMessage(message));
    return message;
  } else {
    const data = await res.json();
    throw data;
  }
};

// Delete a Message based on its id
export const deleteMessageThunk = (messageId) => async (dispatch) => {
  const res = await fetch(`/api/messages/${messageId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  dispatch(deleteMessage(messageId));
  return data;
};

// Message Reducer

// Initial State
const initialState = {};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      let channelMessagesState = {};
      const { messages } = action.messages;
      messages.forEach(
        (message) => (channelMessagesState[message.id] = { ...message })
      );
      return channelMessagesState;
    case SEND_MESSAGE:
      const newMessage = action.message;
      return {
        ...state,
        channelMessagesState: {
          ...state.channelMessagesState,
          [newMessage.id]: newMessage,
        },
      };
    case EDIT_MESSAGE:
      const editState = { ...state, [action.message.id]: action.message };
      return editState;
    case DELETE_MESSAGE:
      const deleteState = { ...state };
      delete deleteState[action.messageId];
      return deleteState;
    case ADD_MESSAGE_TO_STORE:
      return {
        ...state,
        channelMessagesState: {
          ...state.channelMessagesState,
          [newMessage.id]: newMessage,
        },
      };
    default:
      return state;
  }
}
