import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import AddPostForm from './AddPostForm';
import { Box, Typography, Button, CircularProgress } from '@material-ui/core';
import CommentBox from './CommentBox';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deletePost, loadPostDetails } from './actions/postsActions';
import VoteBox from './VoteBox';

const Post = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [editing, setEditing] = useState(false);

  const post = useSelector(state => {
    if (!state.posts[id]) return null;
    const { votes, ...postData } = state.posts[id];
    return postData;
  }, shallowEqual);

  useEffect(() => {
    if (!post || !post.isLoaded) {
      dispatch(loadPostDetails(id));
    }
  }, [post, dispatch, id]);

  if (!post || !post.isLoaded) {
    return <CircularProgress />;
  }

  if (post.error) {
    return <Redirect to="/" />;
  }

  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);

  if (editing) return <AddPostForm id={id} cancelEdit={handleCancel} />;

  const handleDelete = () => {
    dispatch(deletePost(id));
    history.push('/');
  }

  return (
    <Box>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
      <Typography variant="h3" gutterBottom>{post.title}</Typography>
      {post.description &&
        <Typography variant="subtitle2" gutterBottom>{post.description}</Typography>}
      <Typography variant="body1">{post.body}</Typography>
      <VoteBox postId={id} />
      <CommentBox postId={id} />
    </Box>
  );
}
 
export default Post;