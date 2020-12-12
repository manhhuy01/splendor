export const initialState = {
  actionType: undefined,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'collect_token':
      if (action.color) {
        return {
          ...state,
          token: {
            ...state.token,
            [action.color]: (state.token[action.color] || 0) + 1,
          },
        };
      }
      return {
        actionType: action.type,
        token: {},
      };

    case 'reset':
      return { actionType: undefined };
    case 'deposit_card': {
      return {
        ...state,
        actionType: action.type,
        deposit_card_id: action.deposit_card_id,
        deposit_card_level: action.deposit_card_level,
        card: action.card,
      };
    }
    case 'buy_card': {
      if (action.card) {
        return {
          ...state,
          card: action.card,
        };
      }
      if (action.color) {
        return {
          ...state,
          token: {
            ...state.token,
            [action.color]: (state.token[action.color] || 0) + 1,
          },
        };
      }
      return {
        actionType: action.type,
        token: {},
      };
    }
    case 'return_token': {
      if (action.color) {
        return {
          ...state,
          token: {
            ...state.token,
            [action.color]: (state.token[action.color] || 0) + 1,
          },
        };
      }
      return {
        actionType: action.type,
        token: {},
      };
    }
    default:
      return state;
  }
};
