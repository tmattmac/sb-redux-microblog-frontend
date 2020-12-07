import { API_URL } from '../config';
import axios from 'axios';

const addComment = ({ postId, text }) => {
  return async (dispatch) => {
    try {
      const { data: { id } } = await axios.post(`${API_URL}/posts/${postId}/comments`, { text });
      dispatch(addedComment({ postId, id, text }));
    } catch (e) {
      // ignore for now
    }
  }
}

const deleteComment = (postId, id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/posts/${postId}/comments/${id}`);
      dispatch(deletedComment(postId, id));
    } catch (e) {
      // ignore for now
    }
  }
}

const initComments = (postId) => {
  return ({
    type: 'comments/init',
    payload: { postId }
  })
}

const addedComment = ({ postId, id, text }) => {
  return ({
    type: 'comments/add',
    payload: {
      id, postId, text
    }
  })
}

const deletedComment = (postId, id) => {
  return ({
    type: 'comments/delete',
    payload: { postId, id }
  })
}

const deleteParentPost = (postId) => {
  return ({
    type: 'comments/deletePost',
    payload: { postId }
  })
}

export { initComments, addComment, deleteComment, deleteParentPost }