import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  divider: {
    width: '40px',
    border: 0
  }
});

export const MiniDivider = ({ color }) => {
  const classes = useStyles();
  return (
    <hr
      className={classes.divider}
      style={{ borderTop: '2px solid ' + color, padding: '10px' }}
    />
  );
};
