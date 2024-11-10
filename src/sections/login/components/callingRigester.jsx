import { Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const Calling = ({ label, href }) => {
  return (
    <Typography>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </Typography>
  );
};

Calling.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  };

 
export default Calling;
