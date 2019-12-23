import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Switch,
  FormGroup,
  FormControlLabel,
  Icon
} from '@material-ui/core';
import ProcessImage from 'react-imgpro';
import * as colors from '../../components/colors';
import { CloudUpload, Send } from '@material-ui/icons';

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

  const handleSubmit = () => {
    console.log(models);
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
        <ProcessImage
          image={image}
          className={classes.image}
          scaleToFit={{ width: 400, height: 400 }}></ProcessImage>
        <FormGroup row>
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
          onClick={handleSubmit}
          endIcon={<Send />}>
          Submit
        </Button>
      </Paper>
    </div>
  );
};

export default Upload;
