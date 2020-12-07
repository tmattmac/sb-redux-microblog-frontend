import { Typography, Button, TextField } from '@material-ui/core';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import useFormData from './useFormData';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { editPost, createPost } from './actions/postsActions';

const AddPostForm = ({ id, cancelEdit }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const cancelAction = cancelEdit || (() => history.push('/'));

  let post = useSelector(state => state.posts[id], shallowEqual);
  post = post || {};

  const { formData, updateFormData } = useFormData(
    ['title', 'description', 'body'],
    post
  )

  if (id && !post.title) return <Redirect to="/" />;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      dispatch(createPost(formData))
        .then(id => history.push(`/${id}`));
    }
    else {
      dispatch(editPost({ id, ...formData }));
      cancelEdit();
    }
  }

  return ( 
    <>
    <Typography variant="h2">
      {post.title ? 'Edit Post' : 'New Post'}    
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        onChange={updateFormData}
        value={formData.title}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        name="description"
        label="Description"
        onChange={updateFormData}
        value={formData.description}
        margin="normal"
        fullWidth
      />
      <TextField
        name="body"
        label="PostBody"
        onChange={updateFormData}
        value={formData.body}
        margin="normal"
        fullWidth
        required
        multiline
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
      >
        Save
      </Button>
      <Button 
        variant="contained"
        onClick={cancelAction}
      >
        Cancel
      </Button>
    </form>
    </>
  );
}
 
export default AddPostForm;