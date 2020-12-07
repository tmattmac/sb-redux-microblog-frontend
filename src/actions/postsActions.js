import axios from 'axios';
import { API_URL } from '../config';
import { initComments, deleteParentPost } from './commentsActions';

const createPost = ({ title, body, description }) => {
  return async (dispatch) => {
    try {
      const data = { title, body, description };
      const { data: { id, votes } } = await axios.post(`${API_URL}/posts`, data);
      dispatch(addPost({ id, title, body, description, votes }));
      dispatch(initComments(id));
      return id;
    } catch (e) {
      // ignore for now
    }
  }
}

const loadPosts = () => {
  return async (dispatch, getState) => {
    try {
      const { meta: { allLoaded }} = getState();
      if (!allLoaded) {
        const { data } = await axios.get(`${API_URL}/posts`);
        console.log(data);
        const posts = data.reduce((posts, post) => {
          const { id, ...postData } = post;
          posts[id] = postData;
          return posts;
        }, {});
        dispatch({
          type: 'posts/loadAll',
          payload: posts
        });
        dispatch({
          type: 'meta/allLoaded'
        })
      }
    } catch (e) {
      // ignore for now
    }
  }
}

const loadPostDetails = (postId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${API_URL}/posts/${postId}`);
      const { comments, ...postData } = data;

      const commentObj = comments.reduce((comments, comment) => {
        const { id, text } = comment;
        return { ...comments, [id]: text };
      }, {});

      dispatch({
        type: 'posts/loadOne',
        payload: postData
      });
      dispatch({
        type: 'comments/load',
        payload: { postId, comments: commentObj }
      });
    } catch (e) {
      // TODO: Assume there might be other types of errors
      dispatch({ type: 'posts/notFound', payload: { id: postId } });
    }
  }
}

const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/posts/${postId}`);
      dispatch(deletedPost(postId));
      dispatch(deleteParentPost(postId))
    } catch (e) {
      // TODO: Assume there might be other types of errors
      dispatch({ error: 'NOT_FOUND' });
    }
  }
}

const editPost = ({ id, title, body, description }) => {
  return async (dispatch) => {
    try {
      const data = { title, body, description };
      await axios.put(`${API_URL}/posts/${id}`, data);
      dispatch(editedPost({ id, ...data }));
    } catch (e) {
      // TODO: Assume there might be other types of errors
      dispatch({ error: 'NOT_FOUND' });
    }
  }
}

const voteOnPost = (id, amt) => {
  return async (dispatch) => {
    try {
      const voteType = amt > 0 ? 'up' : 'down';
      const voteAmt = amt > 0 ? 1 : -1;
      await axios.post(`${API_URL}/posts/${id}/vote/${voteType}`);
      dispatch(votedPost(id, voteAmt));
    } catch (e) {
      // ignore for now
    }
  }
}

const addPost = ({ id, title, body, description, votes }) => {
  return ({
    type: 'posts/add',
    payload: {
      id, title, body, description, votes
    }
  })
}

const votedPost = (id, voteAmt) => {
  return ({
    type: 'posts/vote',
    payload: {
      id, amt: voteAmt
    }
  })
}

const editedPost = ({ id, title, body, description }) => {
  return ({
    type: 'posts/edit',
    payload: {
      id, title, body, description
    }
  })
}

const deletedPost = (id) => {
  return ({
    type: 'posts/delete',
    payload: { id }
  })
}

export { addPost, editPost, deletePost, loadPosts, createPost, loadPostDetails, voteOnPost }