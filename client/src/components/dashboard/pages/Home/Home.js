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
  },
  divider: {
    width: '40px',
    border: 0
  },
  paperHeader: {
    textTransform: 'uppercase'
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
                fill: 'white',
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
                fill: 'grey',
                transition: 'all .2s ease-in-out'
              }
            })
          }
        ];
      }
    }
  }
];

const Home = ({ user, profile }) => {
  const classes = useStyles();

  const pieData =
    user === null
      ? [
          { x: 'Automated Scans', y: 0 },
          { x: 'Custom Scans', y: 100 }
        ]
      : [
          {
            x: 'Automated Scans',
            y: user.statistics[0].automated_scans
          },
          { x: 'Custom Scans', y: user.statistics[0].custom_scans }
        ];

  const { photos, text } = profile;

  return (
    <Container component='main' maxWidth='lg'>
      <Paper
        elevation={4}
        className={classes.paper}
        style={{
          background: colors.colorDarkOrange
        }}>
        <IconHeader icon={Dashboard} text='Dashboard' subheader={false} />
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
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
              animate={{ easing: 'exp' }}
              padAngle={8}
              innerRadius={90}
              data={pieData}
              events={events}
            />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper
            className={classes.paper}
            style={{
              color: 'white',
              background:
                'linear-gradient(52deg, rgba(76,140,60,1) 13%, rgba(105,190,83,1) 64%)'
            }}>
            <Typography variant='h5'>Content Stats</Typography>
            <MiniDivider color='white' />

            <VictoryChart domainPadding={15} height={400} width={400}>
              <VictoryAxis dependentAxis tickFormat={x => x} />
              <VictoryAxis
                tickValues={[1, 2, 3, 4]}
                tickFormat={['Age', 'Text', 'Gesture', 'Clothing']}
              />
              <VictoryBar
                data={[
                  { type: 'Age', count: 5 },
                  { type: 'Text', count: 16 },
                  { type: 'Gesture', count: 2 },
                  { type: 'Clothing', count: 24 }
                ]}
                x='type'
                y='count'
              />
            </VictoryChart>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
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

      {photos.length > 0 || text.length > 0 ? (
        <ProfileContent photos={photos} text={text} />
      ) : (
        <Paper elevation={2} className={classes.paper}>
          <Typography
            variant='h6'
            className={classes.paperHeader}
            style={{ display: 'flex' }}>
            To View Your Social Media Content, Select A Social Media Profile
            From The 'Profile' Page!
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile
});

export default connect(mapStateToProps)(Home);
