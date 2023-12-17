export const initialState = {
  actionType: undefined,
  room: {},
  socket: {},
  token: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'collect_token': {
      const player = state.room.players.find((x) => x.socketId === state.socket.id);
      if (!player) return state;
      const isMyTurn = state.room.game.currentTurn === player.turn;
      if (!isMyTurn) return state;
      const tableToken = state.room.game.table.token;
      const newToken = { ...state.token, [action.color]: (state.token[action.color] || 0) + 1 };
      const tokenValues = Object.values(newToken).filter((value) => value > 0);
      if ((tokenValues.length <= 3 && tokenValues.every((value) => value <= 1))
        || (tokenValues.length === 1 && tokenValues[0] <= 2
          && tableToken[action.color] + newToken[action.color] >= 4)) {
        return {
          ...state,
          actionType: action.type,
          token: newToken,
          room: {
            ...state.room,
            game: {
              ...state.room.game,
              table: {
                ...state.room.game.table,
                token: {
                  ...state.room.game.table.token,
                  [action.color]: tableToken[action.color] - 1,
                },
              },
            },
          },
        };
      }
      alert('Lấy token sai luật');
      return state;
    }
    case 'reset':
      return { ...state, actionType: undefined, token: {} };
    case 'undo_collect_token': {
      const player = state.room.players.find((x) => x.socketId === state.socket.id);
      if (!player) return state;
      const isMyTurn = state.room.game.currentTurn === player.turn;
      if (!isMyTurn) return state;
      const tableToken = state.room.game.table.token;
      const newToken = { ...state.token, [action.color]: (state.token[action.color] || 0) - 1 };
      let { actionType } = state;
      if (!Object.values(newToken).filter((value) => value > 0).length) {
        actionType = undefined;
      }
      return {
        ...state,
        actionType,
        room: {
          ...state.room,
          game: {
            ...state.room.game,
            table: {
              ...state.room.game.table,
              token: {
                ...state.room.game.table.token,
                [action.color]: tableToken[action.color] + 1,
              },
            },
          },
        },
        token: newToken,
      };
    }

    case 'set_room_info': {
      return {
        ...state,
        room: action.room,
      };
    }
    case 'set_socket':
      return {
        ...state,
        socket: {
          id: action.socket.id,
        },
      };
    case 'return_token': {
      const player = state.room.players.find((x) => x.socketId === state.socket.id);
      if (!player) return state;
      const isMyTurn = state.room.game.currentTurn === player.turn;
      if (!isMyTurn) return state;
      const playerToken = state.room.game.players[state.room.game.currentTurn].token;
      const newToken = { ...state.token, [action.color]: (state.token[action.color] || 0) + 1 };
      return {
        ...state,
        actionType: action.type,
        token: newToken,
        room: {
          ...state.room,
          game: {
            ...state.room.game,
            players: {
              ...state.room.game.players,
              [state.room.game.currentTurn]: {
                ...state.room.game.players[state.room.game.currentTurn],
                token: {
                  ...state.room.game.players[state.room.game.currentTurn].token,
                  [action.color]: playerToken[action.color] - 1,
                },
              },
            },
          },
        },
      };
    }
    case 'undo_return_token': {
      const player = state.room.players.find((x) => x.socketId === state.socket.id);
      if (!player) return state;
      const isMyTurn = state.room.game.currentTurn === player.turn;
      if (!isMyTurn) return state;
      const playerToken = state.room.game.players[state.room.game.currentTurn].token;
      const newToken = { ...state.token, [action.color]: (state.token[action.color] || 0) - 1 };
      return {
        ...state,
        token: newToken,
        room: {
          ...state.room,
          game: {
            ...state.room.game,
            players: {
              ...state.room.game.players,
              [state.room.game.currentTurn]: {
                ...state.room.game.players[state.room.game.currentTurn],
                token: {
                  ...state.room.game.players[state.room.game.currentTurn].token,
                  [action.color]: playerToken[action.color] + 1,
                },
              },
            },
          },
        },
      };
    }
    default:
      return state;
  }
};
