const SET_MESSAGES = "SET_MESSAGES";
const SET_ADDITIONAL_MESSAGES = "SET_ADDITIONAL_MESSAGES";
const SET_LAST_MSG = "SET_LAST_MSG";
const REFRESH_MESSAGES = "REFRESH_MESSAGES";

const SET_CHATS = "SET_CHATS";
const SET_LAST_CHAT = "SET_LAST_CHAT";
const REFRESH_CHATS = "REFRESH_CHATS";

const SET_CURRENT_COMPANION = "SET_CURRENT_COMPANION";
const SET_MY_DATA = "SET_MY_DATA";

const SET_CURENT_AUTO_DATA = "SET_CURENT_AUTO_DATA";

const CHATS_RELOAD = "CHATS_RELOAD";
const CHAT_RELOAD = "CHAT_RELOAD";

const BOTTOM_SCROLL = "BOTTOM_SCROLL";

const defaultState = {
  messages: [],
  chats: [],
  currentCompanionData: {},
  myData: {},
  currentAutoData: {},
  chatsReload: true,
  chatReload: 0,
  isBottomScroll: true,
};

export const chatReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_MESSAGES: {
      return {
        ...state,
        messages: action.payload,
      };
    }

    case SET_ADDITIONAL_MESSAGES: {
      return {
        ...state,
        messages: [...action.payload, ...state.messages],
      };
    }

    case SET_LAST_MSG: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }

    case REFRESH_MESSAGES: {
      return {
        ...state,
        messages: [],
      };
    }

    //

    case SET_CHATS: {
      return {
        ...state,
        chats: action.payload,
      };
    }

    case SET_LAST_CHAT: {
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    }

    case REFRESH_CHATS: {
      return {
        ...state,
        chats: [],
      };
    }
    //

    case SET_CURRENT_COMPANION: {
      return {
        ...state,
        currentCompanionData: action.payload,
      };
    }

    case SET_MY_DATA: {
      return {
        ...state,
        myData: action.payload,
      };
    }

    //

    case SET_CURENT_AUTO_DATA: {
      return {
        ...state,
        currentAutoData: action.payload,
      };
    }

    //

    case CHATS_RELOAD: {
      return {
        ...state,
        chatsReload: !state.chatsReload,
      };
    }

    case CHAT_RELOAD: {
      return {
        ...state,
        chatReload: action.payload,
      };
    }

    case BOTTOM_SCROLL: {
      return {
        ...state,
        isBottomScroll: action.payload,
      };
    }

    default:
      return state;
  }
};

export const setMessagesAction = (arr) => ({
  type: SET_MESSAGES,
  payload: arr,
});

export const setAdditionalMessagesAction = (arr) => ({
  type: SET_ADDITIONAL_MESSAGES,
  payload: arr,
});

export const setLastMessageAction = (obj) => ({
  type: SET_LAST_MSG,
  payload: obj,
});

export const refreshMessagesAction = () => ({
  type: REFRESH_MESSAGES,
});

//

export const setChatsAction = (arr) => ({
  type: SET_CHATS,
  payload: arr,
});

export const setLastChatAction = (obj) => ({
  type: SET_LAST_CHAT,
  payload: obj,
});

export const refreshChatsAction = () => ({
  type: REFRESH_CHATS,
});

//

export const setCurrentCompanionDataAction = (obj) => ({
  type: SET_CURRENT_COMPANION,
  payload: obj,
});

export const setMyDataAction = (obj) => ({
  type: SET_MY_DATA,
  payload: obj,
});

//

export const setCurrentAutoDataAction = (obj) => ({
  type: SET_CURENT_AUTO_DATA,
  payload: obj,
});

//

export const reloadChatsAction = () => ({
  type: CHATS_RELOAD,
});

export const reloadChatAction = (num) => ({
  type: CHAT_RELOAD,
  payload: num,
});

//

export const setBottomScroll = (bool) => ({
  type: BOTTOM_SCROLL,
  payload: bool,
});
