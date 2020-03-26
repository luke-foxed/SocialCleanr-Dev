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
  CheckCircle,
  MenuBook
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
import { MiniDivider } from '../../../layout/MiniDivider';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p, h3, h4, h5, h6': {
      fontFamily: 'Raleway'
    }
  }
}));

const Guide = () => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='lg' style={{ marginTop: '40px' }}>
      <Paper
        elevation={4}
        className={classes.paper}
        style={{
          background: colors.colorDarkOrange
        }}>
        <IconHeader icon={MenuBook} text='Guide' subheader={false} />
      </Paper>
    </Container>
  );
};

export default Guide;
