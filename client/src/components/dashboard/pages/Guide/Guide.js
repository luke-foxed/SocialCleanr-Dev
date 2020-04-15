import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as colors from '../../../../helpers/colors';
import { MenuBook, QuestionAnswer, ContactSupport } from '@material-ui/icons';
import { IconHeader } from '../../../layout/IconHeader';
import { MiniDivider } from '../../../layout/MiniDivider';
import { QuestionsAnswers } from './QuestionsAnswers';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p, h3, h4, h5, h6': {
      fontFamily: 'Raleway',
    },
  },
  panelHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  links: {
    textAlign: 'center',
    listStyleType: 'none',
    '& a': {
      fontSize: '18px',
      color: colors.colorDarkOrange,
    },
  },
}));

const Guide = () => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='lg' style={{ marginTop: '40px' }}>
      <Paper
        elevation={2}
        className={classes.paper}
        style={{
          background: colors.colorDarkOrange,
        }}>
        <IconHeader icon={MenuBook} text='Guide' subheader={false} />
      </Paper>

      <Paper elevation={2} className={classes.paper}>
        <IconHeader
          icon={QuestionAnswer}
          text='Questions & Answers'
          subheader={true}
        />

        {QuestionsAnswers.map((item) => (
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

      <Paper elevation={2} className={classes.paper}>
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

      <Paper elevation={2} className={classes.paper}>
        <Typography style={{ color: 'grey', textTransform: 'uppercase' }}>
          SocialCleanr - By Luke Fox
        </Typography>
      </Paper>
    </Container>
  );
};

export default Guide;
