import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
  TextField,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import * as colors from '../../../colors';
import { CloudUpload, Send, Search, Link } from '@material-ui/icons';
import { beginClassification } from '../../../../actions/upload.js';
import {
  cleanResults,
  drawBoundingBox
} from '../../../../helpers/uploadPageHelper';
import { ResultsTable } from './ResultsTable';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paperHeader: {
    paddingBottom: theme.spacing(4)
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
  divider: {
    padding: theme.spacing(2),
    color: 'rgb(180, 180,180)'
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
  const [URL, setURL] = useState('');
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

  return (
    <div>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant='h4' className={classes.paperHeader}>
          Upload An Image
        </Typography>
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

        <div className={classes.divider}>OR</div>

        <TextField
          id='url'
          label='Enter a URL'
          style={{ width: '25%' }}
          onBlur={e => {
            setURL(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setImage(URL)}>
                  <Link />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {image !== '' && (
          <div className={classes.imageBox}>
            <img
              src={boxImage !== '' ? boxImage : image}
              className={classes.image}
            />
          </div>
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
          onClick={handleScanStart}
          endIcon={<Send />}>
          Submit
        </Button>
      </Paper>

      <Paper elevation={2} className={classes.paper}>
        <Typography variant='h4' className={classes.paperHeader}>
          Results
        </Typography>
        {spinnerVisible ? (
          <CircularProgress value={0} />
        ) : (
          <ResultsTable
            flaggedContent={flaggedContent}
            onViewClick={bbox => showBox(bbox)}
          />
        )}
      </Paper>

      <img src={results.image} />
    </div>
  );
};

export default Upload;
