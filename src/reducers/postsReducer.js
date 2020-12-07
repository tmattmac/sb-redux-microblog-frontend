const postsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {

    case 'posts/loadAll': {
      newState = { ...action.payload };
      return newState;
    }
      
    case 'posts/loadOne': {
      const { id, title, description, body, votes } = action.payload;
      const isLoaded = true;
      newState = {
        ...state,
        [id]: {
          ...state[id],
          title,
          description,
          body,
          votes,
          isLoaded
        }
      };
      return newState;
    }

    case 'posts/add': {
      const { id, title, description, body, votes } = action.payload;
      const isLoaded = true;
      newState = {
        ...state,
        [id]: {
          title,
          description,
          body,
          votes,
          isLoaded
        }
      }
      return newState;
    }
      
    case 'posts/vote': {
      const { id, amt } = action.payload;
      newState = {
        ...state,
        [id]: {
          ...state[id],
          votes: state[id].votes + amt
        }
      }
      return newState;
    }
      
    case 'posts/edit': {
      const { id, title, description, body } = action.payload;
      newState = {
        ...state,
        [id]: {
          ...state[id],
          title,
          description,
          body
        }
      }
      return newState;
    }
      
    case 'posts/delete':
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    
    case 'posts/notFound':
      newState = {
        ...state,
        [action.payload.id]: {
          error: 'NOT_FOUND',
          isLoaded: true
        }
      };
      return newState;
    
    default:
      return state;
  }
}

export default postsReducer;