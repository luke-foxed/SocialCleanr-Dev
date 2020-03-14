import * as colors from '../../helpers/colors';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

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
            variant='h4'
            className={classes.paperHeader}
            style={subheader ? { color: 'black' } : { color: color }}>
            {text}
          </Typography>
        </Grid>
      </Grid>
      <hr
        className={classes.divider}
        style={{
          borderTop: '2px solid ' + color,
          marginBottom: subheader ? 40 : 0
        }}
      />
    </div>
  );
};
