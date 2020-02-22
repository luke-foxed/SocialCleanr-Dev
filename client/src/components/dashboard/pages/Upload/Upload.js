import React, { useState } from 'react';
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
  CircularProgress
} from '@material-ui/core';
import * as colors from '../../../colors';
import { CloudUpload, Send, Image, Assessment } from '@material-ui/icons';
import { beginClassification } from '../../../../actions/upload.js';
import {
  cleanResults,
  drawBoundingBox,
  drawBlurringBox
} from '../../../../helpers/uploadPageHelper';
import { ResultsTable } from './ResultsTable';

const PurpleSwitch = withStyles({
  switchBase: {
    color: colors.colorPurple,
    '&$checked': {
      color: colors.colorPurple
    },
    '&$checked + $track': {
      backgroundColor: colors.colorPurple
    }
  },
  checked: {},
  track: {}
})(Switch);

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  divider: {
    paddingBottom: theme.spacing(2),
    width: '40px',
    border: 0
  },
  paperHeader: {
    fontFamily: 'Raleway',
    textTransform: 'uppercase'
  },
  imageBox: {
    margin: theme.spacing(2),
    border: '4px solid' + colors.colorPurple
  },
  image: {
    padding: theme.spacing(1),
    height: 600,
    width: '100%',
    objectFit: 'cover'
  },

  switches: {
    padding: theme.spacing(2)
  },

  switch: {
    color: colors.colorPurple,
    '&$checked': {
      color: colors.colorPurple
    },
    '&$checked + $track': {
      backgroundColor: colors.colorPurple
    },
    checked: {},
    track: {}
  },
  progress: {
    margin: '0 auto'
  },
  subtext: {
    color: '#4a4a4a',
    paddingBottom: theme.spacing(2),
    width: '50%',
    textAlign: 'center'
  }
}));

const Upload = () => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [boxImage, setBoxImage] = useState('');
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [models, setModels] = useState({
    clothing: false,
    gestures: false,
    text: false
  });

  const [results, setResults] = useState({
    people: [],
    text: [],
    gestures: []
  });

  const [flaggedContent, setFlaggedContent] = useState([]);

  const handleInput = event => {
    setImage('');
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const handleSwitch = name => event => {
    setModels({ ...models, [name]: event.target.checked });
  };

  const handleScanStart = async () => {
    setSpinnerVisible(true);
    setResults({ gender: '', topless: '', clothed: '', text: '' });
    let results = await beginClassification(models, image);
    setFlaggedContent(cleanResults(results.data));
    setSpinnerVisible(false);
  };

  const showBox = async box => {
    let boxImage = await drawBoundingBox(image, box);
    setBoxImage(boxImage);
  };

  const cleanImage = async box => {
    let cleanImage = await drawBlurringBox(image, box);
    setBoxImage(cleanImage);
  };

  return (
    <div>
      <Paper elevation={2} className={classes.paper}>
        <Typography
          variant='h4'
          className={classes.paperHeader}
          style={{ display: 'flex' }}>
          <Image
            fontSize='large'
            style={{
              color: colors.colorPurple,
              paddingRight: '10px'
            }}
          />
          Upload An Image
        </Typography>

        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid' + colors.colorPurple }}
        />

        <Typography className={classes.subtext}>
          Want to scan an image before you upload it to your profile? Simple!
          Just upload an image, set the content you wish to scan and then
          submit!
        </Typography>

        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid #4a4a4a' }}
        />

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
            style={{ backgroundColor: colors.colorDarkPink }}
            color='primary'
            startIcon={<CloudUpload />}
            component='span'>
            Upload
          </Button>
        </label>

        {image !== '' && (
          <div className={classes.imageBox}>
            <img
              src={boxImage !== '' ? boxImage : image}
              className={classes.image}
            />
          </div>
        )}

        <FormGroup row className={classes.switches}>
          <FormControlLabel
            control={
              <PurpleSwitch
                color='default'
                checked={models.clothing}
                onChange={handleSwitch('clothing')}
                value='clothing'
              />
            }
            label='Check Clothing'
          />
          <FormControlLabel
            control={
              <PurpleSwitch
                color='default'
                checked={models.gestures}
                onChange={handleSwitch('gestures')}
                value='gestures'
              />
            }
            label='Check Gestures'
          />

          <FormControlLabel
            control={
              <PurpleSwitch
                color='default'
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
          style={{ backgroundColor: colors.colorDarkPink }}
          className={classes.button}
          onClick={handleScanStart}
          endIcon={<Send />}>
          Submit
        </Button>
      </Paper>

      <Paper elevation={2} className={classes.paper}>
        <Typography
          variant='h4'
          className={classes.paperHeader}
          style={{ display: 'flex' }}>
          <Assessment
            fontSize='large'
            style={{
              color: colors.colorPurple,
              paddingRight: '10px'
            }}
          />
          Results
        </Typography>
        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid #4a4a4a' }}
        />
        {spinnerVisible ? (
          <CircularProgress value={0} />
        ) : (
          <ResultsTable
            flaggedContent={flaggedContent}
            onViewClick={bbox => showBox(bbox)}
            onCleanClick={bbox => cleanImage(bbox)}
          />
        )}
      </Paper>

      <img src={results.image} />
    </div>
  );
};

export default Upload;
