import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  Grid,
  GridList,
  GridListTile,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { Image, ArrowForward, Chat } from '@material-ui/icons';
import Lightbox from 'react-image-lightbox';
import { IconHeader } from '../../../layout/IconHeader';
import { isMobile } from 'react-device-detect';

const modalStyle = {
  content: {
    left: isMobile ? 0 : 70,
    right: isMobile ? 0 : 70
  }
};

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

  photoTile: {
    transition: 'all .1s ease-in-out',
    '&:hover': {
      opacity: '0.4',
      cursor: 'pointer'
    }
  }
}));

const ProfileContent = ({ text, photos }) => {
  const classes = useStyles();

  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPhotoOpen, setPhotoOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleImageClick = index => {
    setPhotoOpen(true);
    setLightboxIndex(index);
  };

  const showText = text => {
    setModalOpen(true);
    setModalText(text);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} className={classes.paper}>
            <IconHeader icon={Image} text='Photos' subheader={true} />
            <GridList
              cellHeight={200}
              cols={3}
              style={{ height: 500, overflow: 'auto', width: '95%' }}>
              {photos.map((tile, index) => (
                <GridListTile key={index} cols={1}>
                  <img
                    src={tile}
                    className={classes.photoTile}
                    onClick={() => handleImageClick(index)}
                  />
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
            <IconHeader icon={Chat} text='Posts' subheader={true} />

            <List
              style={{
                textAlign: 'center',
                height: 500,
                overflow: 'auto',
                width: '95%'
              }}>
              {text.map((tile, index) => (
                <ListItem key={index} button onClick={() => showText(tile)}>
                  <ListItemIcon>
                    <ArrowForward />
                  </ListItemIcon>
                  <ListItemText primary={tile.substring(0, 35) + '...'} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {isModalOpen && (
        <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
          <DialogContent>
            <DialogContentText>
              <b>{modalText}</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ProfileContent;
