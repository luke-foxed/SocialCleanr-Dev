import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography, CircularProgress } from '@material-ui/core';
import * as colors from '../../../colors';
import {
  CloudUpload,
  Send,
  Image,
  Assessment,
  CheckCircle,
  EmojiPeople,
  Spellcheck,
  ThumbsUpDown,
  Brush,
  GetApp,
  ChildCare
} from '@material-ui/icons';
import { beginClassification } from '../../../../actions/upload.js';
import {
  cleanResults,
  drawBoundingBox,
  drawBlurringBox,
  blurAllContent,
  createDownloadImage
} from '../../../../helpers/uploadPageHelper';
import { ResultsTable } from './ResultsTable';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1)
  }
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles({
  root: {
    '&$selected': {
      backgroundColor: colors.colorPurple,
      color: 'white'
    }
  },
  selected: {
    color: 'white'
  }
})(ToggleButton);

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
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
  toggleButtons: {
    '& button': {
      width: '140px',
      transition: 'all .5s ease-in-out'
    }
  },
  progress: {
    margin: '0 auto'
  },
  subtext: {
    color: '#4a4a4a',
    width: '50%',
    textAlign: 'center'
  }
}));

const Upload = () => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [boxImage, setBoxImage] = useState('');
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [models, setModels] = useState(() => []);

  const [results, setResults] = useState({
    people: [],
    text: [],
    gestures: []
  });

  const handleInput = event => {
    setImage('');
    setBoxImage('');
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        setImage(reader.result);
        setResultsVisible(false);
      };
    }
  };

  const handleModelSelect = (event, value) => {
    setModels(value);
  };

  const handleScanStart = async () => {
    setSpinnerVisible(true);
    setResults({ gender: '', topless: '', clothed: '', text: '' });
    setFlaggedContent([]);
    let results = await beginClassification(models, image);
    setFlaggedContent(cleanResults(results.data));
    setSpinnerVisible(false);
    setResultsVisible(true);
  };

  const showBox = async box => {
    let boxImage = await drawBoundingBox(image, box);
    setBoxImage(boxImage);
  };

  const cleanImage = async box => {
    let cleanImage = await drawBlurringBox(image, box);
    setBoxImage(cleanImage);
  };

  const handleCleanEntireImage = async () => {
    let boxes = [];
    flaggedContent.forEach(content => {
      boxes.push(content.box);
    });
    let cleanImage = await blurAllContent(image, boxes);
    setBoxImage(cleanImage);
  };

  const handleDownloadImage = () => {
    createDownloadImage(boxImage);
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

        <Typography className={classes.subtext} style={{ padding: '20px' }}>
          Select which models you wish to use:
        </Typography>

        <StyledToggleButtonGroup
          size='small'
          className={classes.toggleButtons}
          value={models}
          onChange={handleModelSelect}>
          <StyledToggleButton
            value='clothing'
            classes={{ selected: classes.toggleSelected }}>
            Clothing
            <EmojiPeople fontSize='large' style={{ paddingLeft: '5px' }} />
          </StyledToggleButton>

          <StyledToggleButton value='text'>
            Text
            <Spellcheck fontSize='large' style={{ paddingLeft: '5px' }} />
          </StyledToggleButton>

          <StyledToggleButton value='gestures'>
            Gestures
            <ThumbsUpDown fontSize='large' style={{ paddingLeft: '5px' }} />
          </StyledToggleButton>

          <StyledToggleButton value='age'>
            Age
            <ChildCare fontSize='large' style={{ paddingLeft: '5px' }} />
          </StyledToggleButton>
        </StyledToggleButtonGroup>

        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid #4a4a4a' }}
        />

        <Button
          variant='contained'
          color='primary'
          size='large'
          style={{ backgroundColor: colors.colorDarkPink }}
          className={classes.button}
          onClick={handleScanStart}
          endIcon={<Send />}>
          Submit
        </Button>

        <CircularProgress
          value={0}
          style={
            spinnerVisible
              ? {
                  display: 'block',
                  color: colors.colorLightPink,
                  margin: '20px'
                }
              : { display: 'none' }
          }
        />
      </Paper>

      {resultsVisible && (
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
            style={{ borderTop: '2px solid ' + colors.colorPurple }}
          />

          {flaggedContent.length > 0 ? (
            <div>
              <ResultsTable
                flaggedContent={flaggedContent}
                onViewClick={bbox => showBox(bbox)}
                onCleanClick={bbox => cleanImage(bbox)}
              />

              <hr
                className={classes.divider}
                style={{ borderTop: '2px solid #4a4a4a' }}
              />

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant='contained'
                  color='primary'
                  size='medium'
                  style={{
                    backgroundColor: colors.colorDarkPink,
                    margin: '5px',
                    width: '200px'
                  }}
                  onClick={handleCleanEntireImage}
                  endIcon={<Brush />}>
                  Clean All
                </Button>

                <Button
                  variant='contained'
                  color='primary'
                  size='medium'
                  style={{
                    backgroundColor: colors.colorLightOrange,
                    margin: '5px',
                    width: '200px'
                  }}
                  onClick={handleDownloadImage}
                  endIcon={<GetApp />}>
                  Download Image
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <CheckCircle
                style={{ height: '100px', width: '100px', color: 'green' }}
              />
              <Typography variant='h6'>Looks Good!</Typography>
              <Typography variant='subtitle1'>
                We couldn't find any innapropriate content based off your
                filters.
              </Typography>
            </div>
          )}
        </Paper>
      )}
    </div>
  );
};

export default Upload;
