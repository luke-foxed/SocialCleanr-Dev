import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core';
import { MiniDivider } from '../../../layout/MiniDivider';
import {
  VictoryPie,
  VictoryAxis,
  VictoryChart,
  VictoryBar,
  VictoryLabel
} from 'victory';

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

export const UsageCharts = ({ stats, socialMediaStats }) => {
  const classes = useStyles();

  // needed due to animation bug --> https://github.com/FormidableLabs/victory-native/issues/144
  const [angle, setAngle] = useState(0);
  const [pieText, setPieValue] = useState({
    scanText: '',
    socialMedia: ''
  });

  useEffect(() => {
    setTimeout(() => {
      setAngle(360);
    }, 500);
  }, []);

  const { photos, text } = socialMediaStats;

  const scanData = [
    { x: 'Automated Scans', y: stats.automated_scans },
    { x: 'Custom Scans', y: stats === null ? 100 : stats.custom_scans }
  ];

  const contentData = [
    { type: 'Age', count: stats.flagged_age },
    { type: 'Text', count: stats.flagged_text },
    { type: 'Gesture', count: stats.flagged_gesture },
    { type: 'Clothing', count: stats.flagged_clothing }
  ];

  const socialMedia = [
    { x: 'Photos', y: photos },
    { x: 'Posts', y: text }
  ];

  const events = [
    {
      target: 'data',
      eventHandlers: {
        onMouseOver: () => {
          return [
            {
              target: 'data',
              mutation: props => {
                // if event has slice data
                if (props.slice) {
                  // identify by label name
                  if (props.slice.data.x.includes('Scans')) {
                    setPieValue({ scanText: Math.round(props.slice.data.y) });
                  } else {
                    setPieValue({
                      socialMedia: Math.round(props.slice.data.y)
                    });
                  }
                }
                return {
                  style: {
                    fill: 'rgb(220,220,220)',
                    transition: 'all .2s ease-in-out'
                  }
                };
              }
            }
          ];
        },
        onMouseOut: () => {
          return [
            {
              target: 'data',
              mutation: () => {
                setPieValue('');
                return {
                  style: {
                    fill: 'white',
                    transition: 'all .2s ease-in-out'
                  }
                };
              }
            }
          ];
        }
      }
    }
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

          <svg viewBox='0 0 400 400'>
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
              labelRadius={180}
              endAngle={angle}
              padAngle={8}
              innerRadius={90}
              data={scanData}
              events={events}
              standalone={false}
            />
            <VictoryLabel
              textAnchor='middle'
              style={{ fontSize: 30, fill: 'white' }}
              x={200}
              y={200}
              text={pieText.scanText}
            />
          </svg>
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
          <Typography variant='h5'>Flagged Content Stats</Typography>
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
              data={contentData}
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
          {text === 0 && photos === 0 ? (
            <Typography style={{ height: 360 }}>
              Please Set An Active Social Media Profile First
            </Typography>
          ) : (
            <svg viewBox='0 0 400 400'>
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
                labelRadius={180}
                endAngle={angle}
                padAngle={8}
                innerRadius={90}
                data={socialMedia}
                events={events}
                standalone={false}
              />
              <VictoryLabel
                textAnchor='middle'
                style={{ fontSize: 30, fill: 'white' }}
                x={200}
                y={200}
                text={pieText.socialMedia}
              />
            </svg>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
