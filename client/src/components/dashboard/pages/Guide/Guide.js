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
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as colors from '../../../../helpers/colors';
import {
  MenuBook,
  QuestionAnswer,
  ExpandMore,
  ContactSupport
} from '@material-ui/icons';
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
  },
  panelHeader: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  links: {
    textAlign: 'center',
    listStyleType: 'none',
    '& a': {
      fontSize: '18px',
      color: colors.colorDarkOrange
    }
  }
}));

const questionsAnswers = [
  {
    question: 'How does each model work?',
    answer: [
      'The gesture model in its current state will only detect middle finger gesutres, though this will be\
      worked on in future to include more offensive gestures!',
      <br />,
      <br />,
      'The clothing model works by detecting people in the given image. If people are detected, each person will\
       be classified by this model to determine if they are wearing too little clothing.',
      <br />,
      <br />,
      'The text model splits a block of text into words and takes in each word to determine if it is explicit or offensive.',
      <br />,
      <br />,
      'The age model simply works by estimating the age of each person and flagging those estimategd under 5 years old.'
    ]
  },
  {
    question: 'I am getting false positives, why?',
    answer:
      'Unfortunately these detection models are still in their infancy\
   (due to time constraints mainly), and are prone to falsly detect things from time to time. To mitigate this, simply click\
   the bin icon to ignore this wrongly flagged content.'
  },
  {
    question:
      'What information does this app store from my Facebook/Twitter profile?',
    answer:
      'This app only stores one item from your social media profile, a token that lets SocialCleanr retrieve your content.\
     No pictures, posts or profile data are stored - just this token.'
  },
  {
    question: 'Is this it safe for the app to store these tokens?',
    answer:
      'Yes, the tokens are encrypted using a secret key and a randomly generated initialization vector.'
  },

  {
    question: 'How to I delete my Facebook/Twitter tokens from the app?',
    answer:
      'In the profile section, the "Remove Site Access" button will disconnect your profile from SocialCleanr\
      , deleting the token in the process. The same can be achieved by deleting your SocialCleanr profile.'
  },

  {
    question: 'Why is my automated scan taking so long?',
    answer:
      'Due to the number of different machine learning models at work for each image, scanning dozens of images can\
      take quite some time. An estimated time will be provided before each scan, which is calculated on a stable internet\
      connection. A poor internet connection means longer waiting times.'
  }
];

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

      <Paper elevation={4} className={classes.paper}>
        <IconHeader
          icon={QuestionAnswer}
          text='Questions & Answers'
          subheader={true}
        />

        {questionsAnswers.map(item => (
          <ExpansionPanel style={{ width: '70%' }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.panelHeader}>
                {item.question}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{item.answer}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Paper>

      <Paper elevation={4} className={classes.paper}>
        <IconHeader
          text='Tips When Posting on Social Media Sites'
          icon={ContactSupport}
          subheader={true}
        />

        <Typography style={{ width: '70%' }}>
          SocialCleanr aims to help users clean their profiles are make them
          aware of what content does not below on social media sites. However,
          SocialCleanr cannot capture every and all forms of offensive content.
          With that, here are a number of considerations you should make when
          determining what content to post to your profile.
          <ul>
            <li>Avoid posting images/text containing alchohol or drugs</li>
            <li>
              Avoid discrimnatory or offensive comments aimed at religion, race
              or gender
            </li>
            <li>
              Avoid posts targeting a specific person/group of people. This
              extends to places of employment
            </li>

            <li>
              Be cautious about posting images of young children - children
              don't always belong on social media
            </li>
          </ul>
        </Typography>
        <MiniDivider color={'#4a4a4a'} />

        <div className={classes.links}>
          <Typography>
            Visit these links for more tips on keeping your social media profile
            and activity clean:
          </Typography>
          <br />
          <li>
            <a href='https://www.lifewire.com/things-you-should-never-post-on-social-networks-2487415'>
              LifeWire - 10 Things You Should Never Post on Social Networks
            </a>
          </li>
          <li>
            <a href='https://www.mcafee.com/blogs/consumer/family-safety/10-easy-ways-to-clean-up-curate-your-social-media/'>
              McAfee - 10 Easy Ways to Clean Up & Curate Your Social Media
            </a>
          </li>
          <li>
            <a href='https://jelliesapp.com/blog/5-reasons-not-to-post-about-your-child-on-social-media'>
              Jellies - 5 Reasons Not to Post About Your Child on Social Media
            </a>
          </li>
        </div>
      </Paper>
    </Container>
  );
};

export default Guide;
