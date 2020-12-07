import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from '@material-ui/core';

const CustomLink = ({ to, ...props }) => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push(to);
  }
  return (
    <Link href={to} onClick={handleClick} {...props} />
  );
}

export default CustomLink;