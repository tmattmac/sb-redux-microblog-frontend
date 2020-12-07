const commentsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {

    case 'comments/load': {
      const { postId, comments } = action.payload;
      newState = { ...state, [postId]: comments };
      return newState;
    }

    case 'comments/init':
      newState = { ...state };
      newState[action.payload.postId] = {};
      return newState;
    
    case 'comments/add': {
      const { postId, id, text } = action.payload;
      newState = {
        ...state,
        [postId]: {
          ...state[postId],
          [id]: text
        }
      }
      return newState;
    }
    
    case 'comments/delete': {
      const { postId, id } = action.payload;
      newState = {
        ...state,
        [postId]: {
          ...state[postId]
        }
      };

      delete newState[postId][id];
      return newState;
    }

    case 'comments/deletePost': {
      newState = { ...state };
      delete newState[action.payload.postId];
      return newState;
    }

    default:
      return state;
  }
}

export default commentsReducer;