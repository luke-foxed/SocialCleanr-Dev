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
import * as colors from '../../../../helpers/colors';

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(2),

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
  const [prevColor, setPrevColor] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setAngle(360);
    }, 500);
  }, []);

  const { photos, text } = socialMediaStats;

  const scanData = [
    { x: 'Automated Scans', y: stats.automated_scans },
    { x: 'Custom Scans', y: stats.custom_scans }
  ];

  const contentData = [
    { type: 'Age', count: stats.flagged_age },
    { type: 'Text', count: stats.flagged_text },
    { type: 'Gesture', count: stats.flagged_gesture },
    { type: 'Clothing', count: stats.flagged_clothing }
  ];

  const socialMediaData = [
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
                setPrevColor(props.style.fill);
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
                    fill: prevColor,
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

  console.log(prevColor);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={2}
          className={classes.paper}
          style={{
            color: 'white'
          }}>
          <div
            style={{
              width: '100%',
              paddingTop: '10px',
              backgroundColor: colors.colorPurple,
              textAlign: 'center',
              boxShadow: 'inset 0 -10px 10px -10px #000000'
            }}>
            <Typography variant='h5'>Scanning Stats</Typography>
            <MiniDivider color='white' />
          </div>

          <svg viewBox='0 0 400 400'>
            <VictoryPie
              height={400}
              width={400}
              colorScale={['#D65DB1', '#783664']}
              animate={{
                duration: 800,
                easing: 'exp'
              }}
              style={{
                labels: { fill: colors.colorDarkPink }
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
              style={{ fontSize: 30, fill: colors.colorDarkPink }}
              x={200}
              y={200}
              text={pieText.scanText}
            />
          </svg>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={2}
          className={classes.paper}
          style={{
            color: 'white'
          }}>
          <div
            style={{
              width: '100%',
              paddingTop: '10px',
              backgroundColor: colors.colorPurple,
              textAlign: 'center',
              boxShadow: 'inset 0 -10px 10px -10px #000000'
            }}>
            <Typography variant='h5'>Flagged Content Stats</Typography>
            <MiniDivider color='white' />
          </div>

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
                tickLabels: { fill: colors.colorDarkPink },
                axis: { stroke: colors.colorDarkPink }
              }}
            />
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={['Age', 'Text', 'Gesture', 'Clothing']}
              style={{
                tickLabels: { fill: colors.colorDarkPink },
                axis: { stroke: colors.colorDarkPink }
              }}
            />
            <VictoryBar
              data={contentData}
              x='type'
              y='count'
              style={{
                data: {
                  fill: ({ index }) => (index % 2 === 0 ? '#D65DB1' : '#783664')
                }
              }}
            />
          </VictoryChart>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={2}
          className={classes.paper}
          style={{
            color: 'white'
          }}>
          <div
            style={{
              width: '100%',
              paddingTop: '10px',
              backgroundColor: colors.colorPurple,
              textAlign: 'center',
              boxShadow: 'inset 0 -10px 10px -10px #000000'
            }}>
            <Typography variant='h5'>Scanning Stats</Typography>
            <MiniDivider color='white' />
          </div>
          {text === 0 && photos === 0 ? (
            <Typography style={{ height: 360, color: 'black' }}>
              Please Set An Active Social Media Profile First
            </Typography>
          ) : (
            <svg viewBox='0 0 400 400'>
              <VictoryPie
                height={400}
                width={400}
                colorScale={['#D65DB1', '#783664']}
                animate={{
                  duration: 800,
                  easing: 'exp'
                }}
                style={{
                  labels: { fill: colors.colorDarkPink }
                }}
                labelRadius={180}
                endAngle={angle}
                padAngle={8}
                innerRadius={90}
                data={socialMediaData}
                events={events}
                standalone={false}
              />
              <VictoryLabel
                textAnchor='middle'
                style={{ fontSize: 30, fill: colors.colorDarkPink }}
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
