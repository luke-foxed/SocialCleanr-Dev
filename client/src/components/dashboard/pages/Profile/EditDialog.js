import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  TextField
} from '@material-ui/core';

export const EditDialog = ({ isOpen, setClose, editType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    avatar: ''
  });
  const DialogForm = () => {
    switch (editType) {
      case 'email': {
        return (
          <div>
            <DialogTitle>Change Email</DialogTitle>
            <DialogContent>
              <DialogContentText>Please enter new Email</DialogContentText>
              <TextField
                margin='normal'
                required
                fullWidth
                onInput={e => setFormData({ [e.target.name]: e.target.value })}
                id='login_email'
                label='Email Address'
                name='login_email'
                autoComplete='email'
                autoFocus
              />
            </DialogContent>
          </div>
        );
      }
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={setClose}>
        <DialogForm />

        <DialogActions>
          <Button onClick={setClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={setClose} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
