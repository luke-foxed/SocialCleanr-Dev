import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Container,
  Grid,
  Button,
  withStyles,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import * as colors from '../../../../helpers/colors';
import {
  ImageSearch,
  ListAlt,
  Send,
  TextFormat,
  Image,
  Assessment,
  CheckCircle
} from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { runAutomatedScan } from '../../../../actions/scan';
import { useState } from 'react';
import { ResultsTable } from '../../../layout/ResultsTable';
import {
  drawBlurringBoxURL,
  drawBoundingBoxURL
} from '../../../../helpers/classificationHelper';
import { IconHeader } from '../../../layout/IconHeader';

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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  divider: {
    width: '40px',
    border: 0
  },
  paperHeader: {
    fontFamily: 'Raleway',
    textTransform: 'uppercase'
  },
  infoGrid: {
    width: '40%'
  },
  infoTextHeader: {
    color: '#808080',
    fontFamily: 'Raleway'
  },
  infoText: {
    fontFamily: 'Raleway',
    textTransform: 'uppercase',
    color: colors.colorDarkPink,
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold'
  },
  toggleButtons: {
    margin: '10px',
    '& button': {
      width: '140px',
      transition: 'all .2s ease-in-out'
    }
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Scan = ({ user, profile }) => {
  const classes = useStyles();
  const [boxImage, setBoxImage] = useState('');
  const [scanType, setScanType] = useState('photos');
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [resultsLoaded, setResultsLoaded] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const { photos, text } = profile;

  // time per image + model loading time
  const estimatedTime =
    scanType === 'photos' ? photos.length * 6 + 10 : text.length * 4 + 10;

  const handleScanStart = async () => {
    setSpinnerVisible(true);
    let clean = await runAutomatedScan(
      scanType,
      scanType === 'photos' ? photos : text
    );
    setFlaggedContent(clean);
    setResultsLoaded(true);
    setSpinnerVisible(false);
  };

  const handleScanTypeSelect = (event, type) => {
    setScanType(type);
    setResultsLoaded(false);
    setBoxImage('');
  };

  const showBox = async (box, content) => {
    let boxImage = await drawBoundingBoxURL(content, box);
    setBoxImage(boxImage);
  };

  const cleanImage = async (box, image) => {
    let boxImage = await drawBlurringBoxURL(image, box);
    setBoxImage(boxImage);
  };

  return (
    <Container component='main' maxWidth='lg'>
      <Paper
        elevation={4}
        className={classes.paper}
        style={{
          background: colors.colorDarkOrange
        }}>
        <IconHeader icon={ImageSearch} text='New Scan' subheader={false} />
      </Paper>

      {photos.length > 0 || text.length > 0 ? (
        <div>
          <Paper elevation={2} className={classes.paper}>
            <IconHeader
              icon={ListAlt}
              text='Scan Information'
              subheader={true}
            />

            <Typography className={classes.infoTextHeader}>
              Please Select A Scan Type:
            </Typography>

            <StyledToggleButtonGroup
              size='small'
              exclusive
              className={classes.toggleButtons}
              value={scanType}
              onChange={handleScanTypeSelect}>
              <StyledToggleButton
                value='photos'
                classes={{ selected: classes.toggleSelected }}>
                Photos
                <Image fontSize='large' style={{ paddingLeft: '5px' }} />
              </StyledToggleButton>

              <StyledToggleButton value='text'>
                Text
                <TextFormat fontSize='large' style={{ paddingLeft: '5px' }} />
              </StyledToggleButton>
            </StyledToggleButtonGroup>

            <hr
              className={classes.divider}
              style={{ borderTop: '2px solid #4a4a4a', padding: '10px' }}
            />

            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'
              className={classes.infoGrid}>
              <Typography className={classes.infoTextHeader}>
                Currently Selected Site:
              </Typography>
              <Typography className={classes.infoText}>
                {profile.site}
              </Typography>

              <Typography className={classes.infoTextHeader}>
                Scan Type:
              </Typography>
              <Typography className={classes.infoText}>{scanType}</Typography>

              <Typography className={classes.infoTextHeader}>
                Number of {scanType[0].toUpperCase() + scanType.slice(1)}:
              </Typography>
              <Typography className={classes.infoText}>
                {scanType === 'photos' ? photos.length : text.length}
              </Typography>

              <Typography className={classes.infoTextHeader}>
                **Estimated Time Required:
              </Typography>
              <Typography className={classes.infoText}>
                ~{estimatedTime} Seconds
              </Typography>
            </Grid>

            <Typography
              className={classes.infoTextHeader}
              style={{ fontSize: '12px', fontStyle: 'italic' }}>
              **Calculated time based off a stable internet collection.
            </Typography>

            <hr
              className={classes.divider}
              style={{ borderTop: '2px solid #4a4a4a', padding: '10px' }}
            />

            <Button
              variant='contained'
              color='primary'
              size='large'
              style={{ backgroundColor: colors.colorDarkPink }}
              onClick={() => handleScanStart()}
              endIcon={<Send />}>
              Submit
            </Button>

            <br />
          </Paper>

          {resultsLoaded && (
            <Paper
              elevation={2}
              className={classes.paper}
              style={{ display: 'block', width: '100%', overflowX: 'auto' }}>
              <IconHeader icon={Assessment} text='Results' subheader={true} />
              {flaggedContent.length > 0 ? (
                <div>
                  <ResultsTable
                    flaggedContent={flaggedContent}
                    onViewClick={(bbox, content) => showBox(bbox, content)}
                    onCleanClick={(bbox, content) => cleanImage(bbox, content)}
                    resultsType={scanType}
                  />
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
      ) : (
        <Typography
          variant='h6'
          className={classes.paperHeader}
          style={{ display: 'flex', textAlign: 'center' }}>
          To View Your Social Media Content, Select A Website From The 'Profile'
          Page!
        </Typography>
      )}

      {boxImage !== '' && (
        <Paper elevation={2} className={classes.paper}>
          <div className={classes.imageBox}>
            <img src={boxImage} className={classes.image} />
          </div>
        </Paper>
      )}

      <Backdrop open={spinnerVisible} className={classes.backdrop}>
        <CircularProgress value={0} style={{ color: colors.colorLightPink }} />
        <br />
        <Typography>
          Your content is currently being searched. This may take some time,
          please do not refresh or close this tab.
        </Typography>
      </Backdrop>
    </Container>
  );
};

Scan.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile
});

export default connect(mapStateToProps)(Scan);
