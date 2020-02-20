import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';

export const DisplayAlert = ({ props }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert elevation={6} variant='filled' severity={props.type}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};
