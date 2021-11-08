const RELOAD_COUNT_AUTO_ID = "RELOAD_COUNT_AUTO_ID";

const defaultState = {
  reloadCountAutoId: true,
};

export const reloadReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RELOAD_COUNT_AUTO_ID: {
      return {
        ...state,
        reloadCountAutoId: !state.reloadCountAutoId,
      };
    }

    default:
      return state;
  }
};

export const reloadCountAutoIdAction = () => ({
  type: RELOAD_COUNT_AUTO_ID,
});
