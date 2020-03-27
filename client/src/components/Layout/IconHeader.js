import * as colors from '../../helpers/colors';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { MiniDivider } from './MiniDivider';

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

  paperHeader: {
    fontFamily: 'Raleway',
    textTransform: 'uppercase'
  }
}));

export const IconHeader = ({ icon, text, subheader }) => {
  const classes = useStyles();
  const color = subheader ? colors.colorDarkOrange : 'white';
  const iconSize = subheader ? 40 : 60;
  const Icon = icon;
  return (
    <div>
      <Grid container direction='row' alignItems='center' justify='center'>
        <Grid item>
          <Icon
            fontSize='large'
            style={{
              height: iconSize,
              width: iconSize,
              color: color,
              paddingRight: '10px'
            }}
          />
        </Grid>
        <Grid item>
          <Typography
            variant={subheader ? 'h4' : 'h3'}
            className={classes.paperHeader}
            style={subheader ? { color: 'black' } : { color: color }}>
            {text}
          </Typography>
        </Grid>
      </Grid>
      <MiniDivider color={color} />
    </div>
  );
};
