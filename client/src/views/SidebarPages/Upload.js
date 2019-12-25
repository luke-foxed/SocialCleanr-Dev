import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Switch,
  FormGroup,
  FormControlLabel,
  Icon,
  Box,
  Typography,
  TextField,
  Input,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import ProcessImage from 'react-imgpro';
import * as colors from '../../components/colors';
import { CloudUpload, Send, GetApp, Face } from '@material-ui/icons';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    marginTop: theme.spacing(2),
    color: 'red',
    border: 5,
    borderRadius: 20,
    borderStyle: 'solid',
    borderColor: colors.colorPurple
  },
  divider: {
    padding: theme.spacing(2)
  },
  checkboxes: {
    padding: theme.spacing(2)
  }
}));

const Upload = () => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [models, setModels] = useState({
    clothing: false,
    gestures: false,
    text: false,
    age: false
  });

  const handleInput = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSwitch = name => event => {
    setModels({ ...models, [name]: event.target.checked });
  };

  const beginClassification = () => {
    alert(URL);
    axios({
      method: 'post',
      url: '/api/classifier/male_clothed',
      data: {
        image: image,
        models: {
          ...models
        }
      }
    });
  };

  return (
    <div>
      <h1>Upload An Image</h1>
      <p>
        Want to check an image BEFORE you upload it to your profile? Give it a
        try below!
      </p>
      <Paper elevation={2} className={classes.paper}>
        <input
          accept='image/*'
          style={{ display: 'none' }}
          id='contained-button-file'
          type='file'
          onChange={handleInput}
        />
        <label htmlFor='contained-button-file'>
          <Button
            variant='contained'
            color='primary'
            startIcon={<CloudUpload />}
            component='span'
            size='large'>
            Upload
          </Button>
        </label>

        <Typography className={classes.divider}>Or</Typography>

        <TextField
          id='url'
          label='URL'
          onBlur={e => {
            setImage(e.target.value);
          }}
        />

        {image !== '' && (
          <Box>
            <ProcessImage
              image={image}
              className={classes.image}
              scaleToFit={{ width: 400, height: 400 }}></ProcessImage>
          </Box>
        )}
        <FormGroup row className={classes.checkboxes}>
          <FormControlLabel
            control={
              <Switch
                checked={models.clothing}
                onChange={handleSwitch('clothing')}
                value='clothing'
              />
            }
            label='Check Clothing'
          />
          <FormControlLabel
            control={
              <Switch
                checked={models.gestures}
                onChange={handleSwitch('gestures')}
                value='gestures'
              />
            }
            label='Check Gestures'
          />

          <FormControlLabel
            control={
              <Switch
                checked={models.text}
                onChange={handleSwitch('text')}
                value='text'
              />
            }
            label='Check Text'
          />
        </FormGroup>

        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={beginClassification}
          endIcon={<Send />}>
          Submit
        </Button>
      </Paper>
    </div>
  );
};

export default Upload;
