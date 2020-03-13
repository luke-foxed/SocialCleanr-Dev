import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Container, Grid, Button } from '@material-ui/core';
import * as colors from '../../../../helpers/colors';
import { ImageSearch, ListAlt } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { runAutomatedScan } from '../../../../actions/scan';
import { useState } from 'react';
import { ResultsTable } from '../../../layout/ResultsTable';
import {
  drawBlurringBox,
  drawBoundingBox
} from '../../../../helpers/classificationHelper';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
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
  }
}));

const Scan = ({ user, profile }) => {
  ////

  let test = {
    site: 'twitter',
    photos: [
      'http://pbs.twimg.com/media/ER5BzvyXYAY4mY4.jpg',
      'http://pbs.twimg.com/media/ERow7S_X0AADPJw.jpg',
      'http://pbs.twimg.com/media/ERaBT0sXUAEoycx.jpg',
      'http://pbs.twimg.com/media/EQ_8LdnXsAEkUeV.jpg',
      'http://pbs.twimg.com/media/EQvtLTxXkAEktoM.jpg'
    ],
    text: [
      'So proud to reach 1000 official games in my career with a very important victory that put us on the top of the tabl… https://t.co/0KmVFS0RUP',
      'Thank you for all your messages of support for my mum. She is currently stable and recovering in hospital. Me and m… https://t.co/GQDHGLFJOB',
      'Stay focused on your goals 💪 https://t.co/UNuGkAAUXm',
      'Always on my mind... see you tomorrow 💪#UCL #forzajuve https://t.co/jXSbJoDCMP',
      '3 more important points!💪🏽\nNow let’s focus on UCL game!\n#finoallafine #forzajuve https://t.co/AzGNpKte4r',
      'My new Mercurial Dream Speed is here and they make me feel like I can move at the speed of light ⚡\nSo excited to se… https://t.co/eWziv3X7Rf',
      'Ice recovery 🧊 💪 https://t.co/6lq1FjrmA6',
      'Family’s lunch ❤️ https://t.co/9r7zgwiGey',
      'No excuses 🤷🏽\u200d♂️💪 https://t.co/QNjMQDvfd4',
      'Good to get back to victories and happy to score again in our stadium!⚽⚽\nProud to reach 50 goals with the bianconer… https://t.co/fKJMw4Ytnc'
    ]
  };

  //////
  const classes = useStyles();

  const { photos, text } = test;
  const [flaggedContent, setFlaggedContent] = useState([]);

  const handleScanStart = async () => {
    let clean = await runAutomatedScan('image', photos);
    setFlaggedContent(clean);
  };

  const showBox = async box => {};

  const cleanImage = async box => {};

  return (
    <Container component='main' maxWidth='lg'>
      <Paper
        elevation={4}
        className={classes.paper}
        style={{
          background: colors.gradientPurpleBlue
        }}>
        <Grid container direction='row' alignItems='center' justify='center'>
          <Grid item>
            <ImageSearch
              fontSize='large'
              style={{
                height: 60,
                width: 60,
                color: 'white',
                paddingRight: '10px'
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant='h4'
              className={classes.paperHeader}
              style={{ color: 'white' }}>
              New Scan
            </Typography>
          </Grid>
        </Grid>
        <hr
          className={classes.divider}
          style={{ borderTop: '2px solid white' }}
        />
      </Paper>

      <Paper elevation={2} className={classes.paper}>
        {photos.length > 0 || text.length > 0 ? (
          <div>
            <Typography
              variant='h4'
              className={classes.paperHeader}
              style={{ display: 'flex' }}>
              <ListAlt
                fontSize='large'
                style={{
                  color: colors.colorPurple,
                  paddingRight: '10px'
                }}
              />
              Scan Information
            </Typography>
            <hr
              className={classes.divider}
              style={{
                borderTop: '2px solid' + colors.colorPurple,
                marginBottom: '20px'
              }}
            />
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'>
              <Typography>Currently Selected Site: </Typography>

              <Typography>{test.site}</Typography>
            </Grid>

            <Button onClick={() => handleScanStart()}>Start Scan</Button>

            <ResultsTable
              flaggedContent={flaggedContent}
              onViewClick={bbox => showBox(bbox)}
              onCleanClick={bbox => cleanImage(bbox)}
              resultsType='image'
            />
          </div>
        ) : (
          <Typography
            variant='h6'
            className={classes.paperHeader}
            style={{ display: 'flex' }}>
            To View Your Social Media Content, Select A Website From The
            'Profile' Page!
          </Typography>
        )}
      </Paper>
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
