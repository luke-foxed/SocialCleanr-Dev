import React, { useState } from 'react';
import {
  Input,
  Modal,
  TransitionablePortal,
  Button,
  Icon,
  Header,
  Divider
} from 'semantic-ui-react';
import axios from 'axios';
import './LoginModal.css';

const ReactDOM = require('react-dom');

const authenticateWithFacebook = async () => {
  let response = await axios.get('http://localhost:5000/facebook-auth');
  console.log(response.body);
};

const authenticateInternally = async () => {
  let response = await axios.get('http://localhost:5000/scrape');
};

const LoginModal = ({ onClose, open }) =>
  open
    ? ReactDOM.createPortal(
        <TransitionablePortal
          onClose={onClose}
          open={open}
          onOpen={() =>
            setTimeout(() => document.body.classList.add('modal-fade-in'), 0)
          }
          transition={{ animation: 'scale', duration: 500 }}>
          <Modal open={open} onClose={onClose} closeIcon>
            <Modal.Header>How Would You Like to Log In?</Modal.Header>

            <Modal.Content>
              <Modal.Description>
                <Header>Via Facebook</Header>
                <p>
                  This option uses Facebook API to handle your login and to
                  return your information
                </p>
                <Button onClick={authenticateWithFacebook} color='facebook'>
                  Login With Facebook
                </Button>
              </Modal.Description>
            </Modal.Content>

            <Modal.Content>
              <Modal.Description>
                <Header>Via SocialCleanr</Header>
                <p>
                  This option allows SocialCleanr to access your account and
                  scrape your content
                </p>
                <Button onClick={authenticateInternally} color='green'>
                  {' '}
                  Login With SocialCleanr
                </Button>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </TransitionablePortal>,
        document.body
      )
    : null;

export default LoginModal;
