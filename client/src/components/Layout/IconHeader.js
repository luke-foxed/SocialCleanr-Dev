import * as colors from '../../helpers/colors';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import { MiniDivider } from './MiniDivider';

const useStyles = makeStyles({
  paperHeader: {
    fontFamily: 'Raleway',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export const IconHeader = ({ icon, text, subheader }) => {
  const classes = useStyles();
  const color = subheader ? colors.colorDarkOrange : 'white';
  const iconSize = subheader ? 40 : 60;
  const Icon = icon;
  return (
    <div className={classes.paper}>
      <Grid container direction='row' alignItems='center' justify='center'>
        <Grid item>
          <Icon
            fontSize='large'
            style={{
              height: iconSize,
              width: iconSize,
              color: color,
              paddingRight: '10px',
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
