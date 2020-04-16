import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Tooltip } from '@material-ui/core';
import { MiniDivider } from '../../../layout/MiniDivider';
import {
  VictoryPie,
  VictoryAxis,
  VictoryChart,
  VictoryBar,
  VictoryLabel,
} from 'victory';
import * as colors from '../../../../helpers/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& p, h3, h4, h5, h6': {
      fontFamily: 'Raleway',
    },
  },
  chartHeader: {
    width: '95%',
    marginTop: '5px',
    paddingTop: '15px',
    backgroundColor: colors.colorPurple,
    textAlign: 'center',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)',
  },
}));

export const UsageCharts = ({ stats, socialMediaStats }) => {
  const classes = useStyles();

  const [angle, setAngle] = useState(0);
  const [prevColor, setPrevColor] = useState('');
  const [pieText, setPieValue] = useState({
    scanText: '',
    socialMedia: '',
  });

  // needed due to animation bug --> https://github.com/FormidableLabs/victory-native/issues/144
  useEffect(() => {
    setTimeout(() => {
      setAngle(360);
    }, 100);
  }, []);

  const { photos, text } = socialMediaStats;

  const scanData = [
    { x: 'Automated', y: stats.automated_scans },
    { x: 'Custom', y: stats.custom_scans },
  ];

  const contentData = [
    { type: 'Age', count: stats.flagged_age },
    { type: 'Text', count: stats.flagged_text },
    { type: 'Gesture', count: stats.flagged_gesture },
    { type: 'Clothing', count: stats.flagged_clothing },
  ];

  const socialMediaData = [
    { x: 'Photos', y: photos },
    { x: 'Posts', y: text },
  ];

  const events = [
    {
      target: 'data',
      eventHandlers: {
        onMouseOver: () => {
          return [
            {
              target: 'data',
              mutation: (props) => {
                setPrevColor(props.style.fill);
                // if event has slice data
                if (props.slice) {
                  // identify by label name
                  if (props.slice.data.x.includes('Scans')) {
                    setPieValue({ scanText: Math.round(props.slice.data.y) });
                  } else {
                    setPieValue({
                      socialMedia: Math.round(props.slice.data.y),
                    });
                  }
                }
                return {
                  style: {
                    fill: 'rgb(220,220,220)',
                    transition: 'all .2s ease-in-out',
                  },
                };
              },
            },
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
                    transition: 'all .2s ease-in-out',
                  },
                };
              },
            },
          ];
        },
      },
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={2}
          className={classes.paper}
          style={{
            color: 'white',
            height: 500,
          }}>
          <div className={classes.chartHeader}>
            <Typography variant='h5'>Scanning Stats</Typography>
            <MiniDivider color='white' />
          </div>

          {stats.automated_scans === 0 && stats.custom_scans === 0 ? (
            <Typography
              style={{
                marginTop: 200,
                color: 'grey',
                textAlign: 'center',
              }}>
              No Scans Recorded!
            </Typography>
          ) : (
            <svg viewBox='0 0 400 400' style={{ marginTop: '15px' }}>
              <VictoryPie
                height={400}
                width={400}
                colorScale={[colors.colorDarkPink, '#783664']}
                animate={{
                  duration: 800,
                  easing: 'exp',
                }}
                style={{
                  labels: { fill: 'black' },
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
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={2}
          className={classes.paper}
          style={{
            color: 'white',
            height: 500,
          }}>
          <div className={classes.chartHeader}>
            <Typography variant='h5'>Flagged Content Stats</Typography>
            <MiniDivider color='white' />
          </div>

          <VictoryChart
            domainPadding={15}
            height={400}
            width={400}
            animate={{
              duration: 800,
              easing: 'exp',
            }}>
            <VictoryAxis dependentAxis tickFormat={(x) => x} />
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={['Age', 'Text', 'Gesture', 'Clothing']}
            />
            <VictoryBar
              data={contentData}
              x='type'
              y='count'
              style={{
                data: {
                  fill: ({ index }) =>
                    index % 2 === 0 ? colors.colorDarkPink : '#783664',
                },
              }}
            />
          </VictoryChart>

          <Tooltip title='Only Counts Automated Scan Cleaned Images' arrow>
            <Typography style={{ color: 'black' }}>
              Cleaned Images:{' '}
              <span style={{ fontWeight: 'bold', color: colors.colorDarkPink }}>
                {stats.images_cleaned}
              </span>
            </Typography>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={2}
          className={classes.paper}
          style={{
            color: 'white',
            height: 500,
          }}>
          <div className={classes.chartHeader}>
            <Typography variant='h5'>Social Media Stats</Typography>
            <MiniDivider color='white' />
          </div>
          {text === 0 && photos === 0 ? (
            <Typography
              style={{
                marginTop: 200,
                color: 'grey',
                textAlign: 'center',
              }}>
              Please Set An Active Social Media Profile First
            </Typography>
          ) : (
            <svg viewBox='0 0 400 400' style={{ marginTop: '15px' }}>
              <VictoryPie
                height={400}
                width={400}
                colorScale={[colors.colorDarkPink, '#783664']}
                animate={{
                  duration: 800,
                  easing: 'exp',
                }}
                style={{
                  labels: { fill: 'black' },
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
