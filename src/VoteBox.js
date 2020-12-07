import { Box, makeStyles, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import { voteOnPost } from './actions/postsActions';
import { red, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  votes: {
    width: '1em',
    textAlign: 'center'
  },
  upvote: {
    color: green[500]
  },
  downvote: {
    color: red[500]
  }
}));

const VoteBox = ({ postId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const votes = useSelector(state => state.posts[postId].votes);

  const handleVote = (amt) => {
    dispatch(voteOnPost(postId, amt));
  }

  return (
    <Box className={classes.root}>
      <IconButton onClick={() => handleVote(-1)}>
        <ThumbDown className={classes.downvote} />
      </IconButton>
      <Typography className={classes.votes}>{votes}</Typography>
      <IconButton onClick={() => handleVote(+1)}>
        <ThumbUp className={classes.upvote} />
      </IconButton>
    </Box>
  )
}

export default VoteBox;