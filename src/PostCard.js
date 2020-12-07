import React from 'react';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import CustomLink from './CustomLink';
import VoteBox from './VoteBox';

const PostCard = ({id, title, description}) => {
  return (
    <Card>
      <CardContent>
        <CustomLink variant="h6" to={`/${id}`}>
          {title}
        </CustomLink>
        {description &&
          <Typography variant="subtitle1">{description}</Typography>}
      </CardContent>
      <CardActions>
        <VoteBox postId={id} />
      </CardActions>
    </Card>
  );
}
 
export default PostCard;