import { Typography, Box, TextField, Button, List, ListItem, ListItemIcon, ListItemText, IconButton, CircularProgress } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addComment, deleteComment } from './actions/commentsActions';
import { v4 as uuid } from 'uuid';

const CommentBox = ({ postId }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments[postId], shallowEqual);

  if (!comments) return <CircularProgress />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text)
      dispatch(addComment({ postId, text, id: uuid() }));
    setText('');
  }
  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  }
  const handleDelete = (id) => {
    dispatch(deleteComment(postId, id))
  }
  
  return (
    <Box marginTop={4}>
      <Typography variant="h5">Comments</Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" alignItems="baseline">
        <TextField label="Comment" value={text} onChange={handleChange} style={{flexGrow: 1}} />
        <Button type="submit">Add Comment</Button>
      </Box>
      <List>
        {Object.keys(comments).map(id => {
          const deleteComment = () => handleDelete(id);
          return (
            <ListItem key={id}>
              <ListItemIcon>
                <IconButton onClick={deleteComment} edge="start">
                  <Delete />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={comments[id]} />
            </ListItem>
          )
        })}
      </List>
    </Box>
  );
}
 
export default CommentBox;