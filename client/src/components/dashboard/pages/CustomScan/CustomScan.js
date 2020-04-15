import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Typography,
  CircularProgress,
  Container,
  Backdrop,
} from '@material-ui/core';
import * as colors from '../../../../helpers/colors';
import {
  CloudUpload,
  Send,
  Assessment,
  CheckCircle,
  EmojiPeople,
  Spellcheck,
  ThumbsUpDown,
  Brush,
  GetApp,
  ChildCare,
  Palette,
} from '@material-ui/icons';
import { runCustomScan } from '../../../../actions/customScan.js';
import {
  drawBoundingBox,
  drawBlurringBox,
  blurAllContent,
  createDownloadImage,
} from '../../../../helpers/classificationHelper';
import { ResultsTable } from '../../../layout/ResultsTable';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { connect } from 'react-redux';
import { setAlert } from '../../../../actions/alert';
import PropTypes from 'prop-types';
import { IconHeader } from '../../../layout/IconHeader';
import { isMobile } from 'react-device-detect';
import { MiniDivider } from '../../../layout/MiniDivider';

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles({
  root: {
    '&$selected': {
      backgroundColor: colors.colorPurple,
      color: 'white',
    },
  },
  selected: {
    color: 'white',
  },
})(ToggleButton);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p, h3, h4, h5, h6': {
      fontFamily: 'Raleway',
    },
  },
  imageBox: {
    textAlign: 'center',
    margin: theme.spacing(2),
  },
  image: {
    padding: '5px',
    height: 600,
    width: '80%',
    objectFit: 'cover',
    border: '3px solid' + colors.colorPurple,
  },
  toggleButtons: {
    '& button': {
      width: '140px',
      transition: 'all .2s ease-in-out',
    },
  },
  toggleButtonsMobile: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    alignItems: 'center',
    margin: '0 auto',
    '& button': {
      width: '140px',
      transition: 'all .2s ease-in-out',
    },
  },
  subtext: {
    color: '#4a4a4a',
    width: '50%',
    textAlign: 'center',
    fontFamily: 'Raleway',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Upload = ({ setAlert, runCustomScan }) => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [boxImage, setBoxImage] = useState('');
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [scanType, setScanType] = useState('photos');
  const [models, setModels] = useState(() => []);

  const handleInput = (event) => {
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
    if (models.length === 0) {
      setAlert('No Model Selected', 'error');
    } else if (image === '') {
      setAlert('No Image Uploaded', 'error');
    } else {
      setSpinnerVisible(true);
      let response = await runCustomScan(models, image);
      setFlaggedContent(response);
      setSpinnerVisible(false);
      setResultsVisible(true);
    }
  };

  const showBox = async (box) => {
    let boxImage = await drawBoundingBox(image, box);
    setBoxImage(boxImage);
  };

  const cleanImage = async (box) => {
    let cleanImage = await drawBlurringBox(image, box);
    setBoxImage(cleanImage);
  };

  const handleCleanEntireImage = async () => {
    let boxes = [];
    flaggedContent.forEach((content) => {
      boxes.push(content.box);
    });
    let cleanImage = await blurAllContent(image, boxes);
    setBoxImage(cleanImage);
  };

  const handleDownloadImage = () => {
    createDownloadImage(boxImage);
  };

  const markFalsePositive = async (id) => {
    setFlaggedContent(flaggedContent.filter((item) => item.content_id !== id));
  };

  return (
    <Container component='main' maxWidth='lg' style={{ marginTop: '40px' }}>
      <Paper
        elevation={2}
        className={classes.paper}
        style={{
          background: colors.colorDarkOrange,
        }}>
        <IconHeader icon={Palette} text='Custom Scan' subheader={false} />
      </Paper>

      <Paper elevation={2} className={classes.paper}>
        <IconHeader
          icon={CloudUpload}
          text='Upload An Image'
          subheader={true}
        />

        <Typography className={classes.subtext}>
          Want to scan an image before you upload it to your profile? Simple!
          Just upload an image, set the content you wish to scan and then
          submit!
        </Typography>

        <MiniDivider color={'#4a4a4a'} />

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
            size='large'
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

        <Container maxWidth='sm'>
          <StyledToggleButtonGroup
            orientation='vertical'
            size='small'
            className={
              isMobile ? classes.toggleButtonsMobile : classes.toggleButtons
            }
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
        </Container>

        <MiniDivider color={'#4a4a4a'} />

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

        <Backdrop open={spinnerVisible} className={classes.backdrop}>
          <CircularProgress
            value={0}
            style={{ color: colors.colorLightPink }}
          />
        </Backdrop>
      </Paper>

      {resultsVisible && (
        <Paper
          elevation={2}
          className={classes.paper}
          style={{ display: 'block', width: '100%', overflowX: 'auto' }}>
          <IconHeader icon={Assessment} text='Results' subheader={true} />

          {flaggedContent.length > 0 ? (
            <div>
              <ResultsTable
                flaggedContent={flaggedContent}
                onViewClick={(bbox) => showBox(bbox)}
                onCleanClick={(bbox) => cleanImage(bbox)}
                onRemoveClick={(id) => markFalsePositive(id)}
                resultsType={scanType}
              />

              <MiniDivider color={'#4a4a4a'} />

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant='contained'
                  color='primary'
                  size='medium'
                  style={{
                    backgroundColor: colors.colorDarkPink,
                    margin: '5px',
                    width: '200px',
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
                    backgroundColor: colors.colorDarkPink,
                    margin: '5px',
                    width: '200px',
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
              <Typography variant='h5'>Looks Good!</Typography>
              <Typography variant='subtitle1'>
                We couldn't find any innapropriate content based off your
                filters.
              </Typography>
            </div>
          )}
        </Paper>
      )}
    </Container>
  );
};

Upload.propTypes = {
  setAlert: PropTypes.func.isRequired,
  runCustomScan: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, runCustomScan })(Upload);
