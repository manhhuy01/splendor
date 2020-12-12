export const initialState = {
  actionType: undefined,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'collect_token':
      return { ...state, actionType: action.type, token: {} };
    case 'reset':
      return { ...state, actionType: undefined };
    case 'collect':
      return {
        ...state,
        token: {
          ...state.token,
          [action.color]: (state.token[action.color] || 0) + 1,
        },
      };
    default:
      return state;
  }
};
