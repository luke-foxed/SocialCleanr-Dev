import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
  TextField,
  CircularProgress,
  TableRow,
  TableBody,
  TableHead,
  Table,
  TableCell,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import ProcessImage from 'react-imgpro';
import * as colors from '../../../colors';
import { CloudUpload, Send, Search, Link } from '@material-ui/icons';
import { beginClassification } from '../../../../actions/upload.js';
import {
  cleanResults,
  drawBoundingBox
} from '../../../../helpers/uploadPageHelper';
import { ResultCell } from './ResultCell';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBox: {
    margin: theme.spacing(2),
    border: '4px solid' + colors.colorPurple
  },
  image: {
    padding: '4px',
    height: 600,
    width: '100%',
    objectFit: 'cover'
  },
  divider: {
    padding: theme.spacing(2)
  },
  checkboxes: {
    padding: theme.spacing(2)
  },
  progress: {
    margin: '0 auto'
  }
}));

const Upload = () => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [URL, setURL] = useState('');
  const [boxImage, setBoxImage] = useState('');
  const [progressVisible, setProgressVisible] = useState(false);
  const [models, setModels] = useState({
    clothing: false,
    gestures: false,
    text: false,
    age: false
  });

  const [results, setResults] = useState({
    people: [],
    text: [],
    gestures: []
  });

  const [flaggedContent, setFlaggedContent] = useState([]);

  const handleInput = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const handleSwitch = name => event => {
    setModels({ ...models, [name]: event.target.checked });
  };

  const handleScanStart = async () => {
    setResults({ gender: '', topless: '', clothed: '', text: '' });
    setProgressVisible(true);
    let results = await beginClassification(models, image);
    setFlaggedContent(cleanResults(results.data));
    setProgressVisible(false);
  };

  const handleViewBox = async (image, box) => {
    let boxImage = await drawBoundingBox(image, box);
    setBoxImage(boxImage);
  };

  return (
    <div>
      <Typography variant='h4'>Upload An Image</Typography>
      <Typography variant='subtitle1'>
        Want to check an image BEFORE you upload it to your profile? Give it a
        try below!
      </Typography>
      <Paper elevation={2} className={classes.paper}>
        <input
          accept='image/*'
          style={{ display: 'none' }}
          id='contained-button-file'
          type='file'
          onChange={handleInput}
        />
        <label htmlFor='contained-button-file'>
          <Button
            variant='contained'
            color='primary'
            startIcon={<CloudUpload />}
            component='span'
            size='large'>
            Upload
          </Button>
        </label>

        <Typography className={classes.divider}>Or</Typography>

        <TextField
          id='url'
          label='Enter a URL'
          style={{ width: '25%' }}
          onBlur={e => {
            setURL(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={e => {
                    setImage(URL);
                  }}>
                  <Link />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {image !== '' && (
          <div className={classes.imageBox}>
            <img
              src={boxImage !== '' ? boxImage : image}
              className={classes.image}
              // scaleToFit={{ width: 500, height: 500 }}
            />
          </div>
        )}
        <FormGroup row className={classes.checkboxes}>
          <FormControlLabel
            control={
              <Switch
                checked={models.clothing}
                onChange={handleSwitch('clothing')}
                value='clothing'
              />
            }
            label='Check Clothing'
          />
          <FormControlLabel
            control={
              <Switch
                checked={models.gestures}
                onChange={handleSwitch('gestures')}
                value='gestures'
              />
            }
            label='Check Gestures'
          />

          <FormControlLabel
            control={
              <Switch
                checked={models.text}
                onChange={handleSwitch('text')}
                value='text'
              />
            }
            label='Check Text'
          />
        </FormGroup>

        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleScanStart}
          endIcon={<Send />}>
          Submit
        </Button>
      </Paper>

      {results.gender == '' && (
        <CircularProgress
          style={{ display: progressVisible ? 'block' : 'none' }}
          value={0}
          color='secondary'
          className={classes.progress}
        />
      )}

      <Typography variant='h4'>Results</Typography>
      <Paper elevation={2} className={classes.paper}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' />
              <TableCell align='center'>Warning Type</TableCell>
              <TableCell align='center'>Message</TableCell>
              <TableCell align='center'>Probability</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flaggedContent.map((value, index) => (
              <ResultCell
                key={index}
                props={value}
                onViewClick={() => handleViewBox(image, value.box)}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>

      <img src={results.image} />
    </div>
  );
};

export default Upload;
