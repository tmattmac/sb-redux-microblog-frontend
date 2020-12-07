import { combineReducers } from 'redux';
import comments from './commentsReducer';
import posts from './postsReducer';

const error = (state = '', action) => {
  if (action.error) return action.error;
  if (action.type === 'errors/clear') return '';
  return state;
}

const meta = (state = {}, action) => {
  switch (action.type) {
    case 'meta/allLoaded':
      return { ...state, allLoaded: true };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ posts, comments, error, meta });

export default rootReducer;