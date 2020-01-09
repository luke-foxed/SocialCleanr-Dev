import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Switch,
  FormGroup,
  FormControlLabel,
  Box,
  Typography,
  TextField,
  CircularProgress
} from '@material-ui/core';
import ProcessImage from 'react-imgpro';
import * as colors from '../../components/colors';
import { CloudUpload, Send, GetApp, Face } from '@material-ui/icons';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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
    borderColor: colors.colorPurple,
    objectFit: 'cover'
  },
  divider: {
    padding: theme.spacing(2)
  },
  checkboxes: {
    padding: theme.spacing(2)
  },
  progress: {
    margin: '0 auto'
  }
}));

const Upload = () => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [progressVisible, setProgressVisible] = useState(false);
  const [models, setModels] = useState({
    clothing: false,
    gestures: false,
    text: false,
    age: false
  });

  const [results, setResults] = useState({
    topless: '',
    clothed: '',
    gender: ''
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

  const beginClassification = async () => {
    setResults({
      topless: '',
      clothed: '',
      gender: ''
    });

    setProgressVisible(true);

    let response = await axios({
      method: 'post',
      url: '/api/classifier/filter_models',
      data: {
        image: image,
        models: {
          ...models
        }
      }
    });

    console.log(response);

    // setProgressVisible(false);

    // setResults({
    //   ...results,
    //   topless: response.data.topless,
    //   clothed: response.data.clothed,
    //   gender: response.data.gender
    // });
  };

  return (
    <div>
      <Typography variant='h4'>Upload An Image</Typography>
      <Typography variant='subtitle1'>
        Want to check an image BEFORE you upload it to your profile? Give it a
        try below!
      </Typography>
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
          style={{ width: '25%' }}
          onBlur={e => {
            setImage(e.target.value);
          }}
        />

        {image !== '' && (
          <Box>
            <ProcessImage
              image={image}
              className={classes.image}
              scaleToFit={{ width: 500, height: 500 }}></ProcessImage>
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

      {results.gender == '' && (
        <CircularProgress
          style={{ display: progressVisible ? 'block' : 'none' }}
          value={0}
          color='secondary'
          className={classes.progress}
        />
      )}

      <Typography variant='h4'>Results</Typography>
      <Paper elevation={2} className={classes.paper}>
        <Typography>
          Gender: <b>{results.gender.toLocaleUpperCase()}</b>
        </Typography>
        <Typography>
          Topless: {Number(results.topless).toFixed(2) * 100}%
        </Typography>
        <Typography>
          Clothed: {Number(results.clothed).toFixed(2) * 100}%
        </Typography>
      </Paper>
    </div>
  );
};

export default Upload;
