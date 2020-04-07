import React from 'react';
import {
  Typography,
  Paper,
  Button,
  Avatar,
  makeStyles,
} from '@material-ui/core';
import { VideogameAsset, LocalHospital } from '@material-ui/icons';
import * as colors from '../../../../helpers/colors';
import { IconHeader } from '../../../layout/IconHeader';
import { MiniDivider } from '../../../layout/MiniDivider';
import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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

  scoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const Gamification = ({ isEnabled, onToggleClick, profileScore }) => {
  const classes = useStyles();

  const handleToggleClick = (toggle) => {
    onToggleClick(toggle);
  };

  return (
    <Paper elevation={2} className={classes.paper}>
      <IconHeader icon={VideogameAsset} text='Gamification' subheader={true} />
      <Typography style={{ width: '70%', textAlign: 'center' }}>
        SocialCleanr's Gamification System allows for your selected social media
        profile to be 'scored' based off the results of your automated scans.
        Flagged content <b>will be stored</b> after each scan and will
        contribute to your score. This will also enable notification reminders
        to action this stored flagged content.
        <br /> <br />
        Once enabled, content that has yet to be actioned can be found at the
        bottom of the <b>'Scan'</b> section
        <br /> <br />
        This option can be disabled at any time. When done so, any stored
        images/posts will be deleted from the database.
      </Typography>
      <br />
      <Button
        disabled={isEnabled}
        variant='contained'
        size='large'
        onClick={() => handleToggleClick(true)}
        style={
          isEnabled
            ? { backgroundColor: '#c8c8c8', color: '#8a8a8a' }
            : { backgroundColor: colors.colorDarkPink, color: 'white' }
        }>
        Enable
      </Button>
      <br />
      <Button
        disabled={!isEnabled}
        variant='contained'
        size='large'
        onClick={() => handleToggleClick(false)}
        style={
          !isEnabled
            ? { backgroundColor: '#c8c8c8', color: '#8a8a8a' }
            : { backgroundColor: colors.colorDarkPink, color: 'white' }
        }>
        Disable
      </Button>
      <MiniDivider color={'#4a4a4a'} />

      {isEnabled === true && (
        <div className={classes.scoreContainer}>
          <Typography> Your social media profile's health score is:</Typography>
          <br />
          <Avatar
            style={{
              backgroundColor: colors.colorGreen,
              width: 100,
              height: 100,
            }}>
            <LocalHospital
              fontSize='large'
              style={{
                color: 'white',
                width: 60,
                height: 60,
              }}
            />
          </Avatar>

          <CountUp
            end={profileScore}
            suffix='%'
            delay={2}
            duration={5}
            style={{ fontSize: '50px', color: colors.colorGreen }}
          />
        </div>
      )}
    </Paper>
  );
};
