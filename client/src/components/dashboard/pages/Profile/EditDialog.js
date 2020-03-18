import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { updateUser, deleteUser } from '../../../../actions/user';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  TextField,
  Avatar,
  Typography
} from '@material-ui/core';
import { MiniDivider } from '../../../layout/MiniDivider';
import { setAlert } from '../../../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Warning } from '@material-ui/icons';

const EditDialog = ({
  isOpen,
  setClose,
  editType,
  updateUser,
  deleteUser,
  setAlert
}) => {
  const [formData, setFormData] = useState({
    email: '',
    current_password: '',
    password: '',
    confirm_password: '',
    avatar: ''
  });

  const {
    email,
    current_password,
    password,
    confirm_password,
    avatar
  } = formData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (editType === 'delete') {
      deleteUser();
    } else {
      if (editType === 'password' && password !== confirm_password) {
        setAlert('Passwords Do Not Match', 'error');
      } else {
        setClose();
        updateUser({ email, current_password, password, avatar }, editType);
      }
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={setClose}>
        <DialogTitle>{editType.toUpperCase()}</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={
              editType === 'delete'
                ? { display: 'none' }
                : { display: 'inherit' }
            }>
            Please Fill Out The Field(s) Below:
          </DialogContentText>

          {editType === 'email' && (
            <TextField
              margin='normal'
              required
              fullWidth
              onInput={handleInputChange}
              label='Email Address'
              name='email'
              type='email'
            />
          )}

          {editType === 'password' && (
            <div>
              <TextField
                margin='normal'
                required
                fullWidth
                name='current_password'
                label='Current Password'
                type={'password'}
                onInput={handleInputChange}
              />

              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={'password'}
                onInput={handleInputChange}
              />

              <TextField
                margin='normal'
                required
                fullWidth
                name='confirm_password'
                label='Confirm Password'
                type={formData.showPassword ? 'text' : 'password'}
                onInput={handleInputChange}
              />
            </div>
          )}

          {editType === 'avatar' && (
            <div>
              <TextField
                margin='normal'
                required
                fullWidth
                label='Avatar URL'
                name='avatar'
                onInput={handleInputChange}
              />

              <MiniDivider color={'#4a4a4a'} />

              <Avatar
                src={formData.avatar}
                style={{ width: 150, height: 150, margin: '0 auto' }}
              />
            </div>
          )}

          {editType === 'delete' && (
            <div style={{ textAlign: 'center' }}>
              <Warning style={{ width: 120, height: 120 }} />
              <Typography>
                Are you sure you wish to delete your account?
              </Typography>
              <Typography>This cannot be undone!</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={setClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EditDialog.propTypes = {
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { updateUser, deleteUser, setAlert })(EditDialog);
