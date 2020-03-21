import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Container, Grid } from '@material-ui/core';
import * as colors from '../../../../helpers/colors';
import { Dashboard } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileContent from './ProfileContent';
import { IconHeader } from '../../../layout/IconHeader';
import { MiniDivider } from '../../../layout/MiniDivider';
import { VictoryPie, VictoryAxis, VictoryChart, VictoryBar } from 'victory';

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

const events = [
  {
    target: 'data',
    eventHandlers: {
      onMouseOver: () => {
        return [
          {
            target: 'data',
            mutation: () => ({
              style: {
                fill: 'grey',
                transition: 'all .2s ease-in-out'
              }
            })
          }
        ];
      },
      onMouseOut: () => {
        return [
          {
            target: 'data',
            mutation: () => ({
              style: {
                fill: 'white',
                transition: 'all .2s ease-in-out'
              }
            })
          }
        ];
      }
    }
  }
];

export const UsageCharts = ({ stats }) => {
  const classes = useStyles();

  // needed due to animation bug --> https://github.com/FormidableLabs/victory-native/issues/144
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAngle(360);
    }, 500);
  }, []);

  const pieData = [
    { x: 'Automated Scans', y: stats.automated_scans },
    { x: 'Custom Scans', y: stats === null ? 100 : stats.custom_scans }
  ];

  const barData = [
    { type: 'Age', count: stats.flagged_age },
    { type: 'Text', count: stats.flagged_text },
    { type: 'Gesture', count: stats.flagged_gesture },
    { type: 'Clothing', count: stats.flagged_clothing }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper
          className={classes.paper}
          style={{
            color: 'white',
            background:
              'linear-gradient(52deg, rgba(27,98,153,1) 13%, rgba(49,135,201,1) 64%)'
          }}>
          <Typography variant='h5'>Scanning Stats</Typography>
          <MiniDivider color='white' />

          <VictoryPie
            height={400}
            width={400}
            animate={{
              duration: 800,
              easing: 'exp'
            }}
            style={{
              data: { fill: 'white' },
              labels: { fill: 'white' }
            }}
            labels={({ datum }) =>
              angle === 0 ? '' : `${datum.x} (${datum.y})`
            }
            labelRadius={180}
            endAngle={angle}
            padAngle={8}
            innerRadius={90}
            data={pieData}
            events={events}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          className={classes.paper}
          style={{
            color: 'white',
            background:
              'linear-gradient(52deg, rgba(76,140,60,1) 13%, rgba(105,190,83,1) 64%)'
          }}>
          <Typography variant='h5'>Content Stats</Typography>
          <MiniDivider color='white' />

          <VictoryChart
            domainPadding={15}
            height={400}
            width={400}
            animate={{
              duration: 800,
              easing: 'exp'
            }}>
            <VictoryAxis
              dependentAxis
              tickFormat={x => x}
              style={{
                tickLabels: { fill: 'white' },
                axis: { stroke: 'white' }
              }}
            />
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={['Age', 'Text', 'Gesture', 'Clothing']}
              style={{
                tickLabels: { fill: 'white' },
                axis: { stroke: 'white' }
              }}
            />
            <VictoryBar
              data={barData}
              events={events}
              x='type'
              y='count'
              style={{
                data: { fill: 'white' }
              }}
            />
          </VictoryChart>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          className={classes.paper}
          style={{
            color: 'white',
            background:
              'linear-gradient(52deg, rgba(162,35,18,1) 13%, rgba(205,65,46,1) 64%)'
          }}>
          <Typography variant='h5'>Social Media Stats</Typography>
          <MiniDivider color='white' />
        </Paper>
      </Grid>
    </Grid>
  );
};
