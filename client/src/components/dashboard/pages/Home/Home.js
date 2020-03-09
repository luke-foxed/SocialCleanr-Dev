import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Container,
  Grid,
  GridList,
  GridListTile
} from '@material-ui/core';
import * as colors from '../../../../helpers/colors';
import { Image, Dashboard } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';

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
  }
}));

const modalStyle = {
  content: {
    left: 100,
    right: 100
  }
};

const Home = ({ user, profile }) => {
  const classes = useStyles();
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPhotoOpen, setPhotoOpen] = useState(false);

  const handleImageClick = index => {
    setPhotoOpen(true);
    setLightboxIndex(index);
  };

  const photos = profile.photos;

  return (
    <Container component='main' maxWidth='lg'>
      <Paper elevation={2} className={classes.paper}>
        <Typography
          variant='h4'
          className={classes.paperHeader}
          style={{ display: 'flex' }}>
          <Dashboard
            fontSize='large'
            style={{
              color: colors.colorPurple,
              paddingRight: '10px'
            }}
          />
          Dashboard
        </Typography>

        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid' + colors.colorPurple }}
        />
      </Paper>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
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
              Photos
            </Typography>

            <hr
              className={classes.divider}
              style={{ borderTop: '2px solid' + colors.colorPurple }}
            />

            <GridList cellHeight={160} cols={3}>
              {photos.map((tile, index) => (
                <GridListTile key={index} cols={tile.cols || 1}>
                  <img src={tile} onClick={() => handleImageClick(index)} />
                </GridListTile>
              ))}
            </GridList>

            {isPhotoOpen && (
              <Lightbox
                reactModalStyle={modalStyle}
                mainSrc={photos[lightboxIndex]}
                nextSrc={photos[(lightboxIndex + 1) % photos.length]}
                prevSrc={
                  photos[(lightboxIndex + photos.length - 1) % photos.length]
                }
                onCloseRequest={() => setPhotoOpen(false)}
                onMovePrevRequest={() =>
                  setLightboxIndex(
                    (lightboxIndex + photos.length - 1) % photos.length
                  )
                }
                onMoveNextRequest={() =>
                  setLightboxIndex((lightboxIndex + 1) % photos.length)
                }
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} className={classes.paper}>
            xs=12 sm=6
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile
});

export default connect(mapStateToProps)(Home);
