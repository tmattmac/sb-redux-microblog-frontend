import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@material-ui/core';
import PostCard from './PostCard';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loadPosts } from './actions/postsActions';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts, shallowEqual);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadPosts()).then(() => setIsLoaded(true));
    }
  }, [dispatch, isLoaded]);

  return (
    <Box>
      <Typography variant="h2" gutterBottom>Blog</Typography>
      <Grid container spacing={2}>
        {isLoaded ?
          Object.keys(posts)
            .sort((a, b) => posts[b].votes - posts[a].votes)
            .map(id => (
            <Grid item xs={12} md={6} key={id}>
              <PostCard 
                id={id} 
                title={posts[id].title} 
                description={posts[id].description}
              />
            </Grid>
          ))
          :
          <CircularProgress />
        }
      </Grid>
    </Box>
  );
}
 
export default Home;