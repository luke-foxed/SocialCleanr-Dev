import React from 'react';

export const QuestionsAnswers = [
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
