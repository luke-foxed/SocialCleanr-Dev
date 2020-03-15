import {
  TableRow,
  TableCell,
  Button,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Avatar,
  Grid
} from '@material-ui/core';
import React from 'react';
import { Warning, Visibility, DeleteForever, Brush } from '@material-ui/icons';

export const ResultsTable = ({
  flaggedContent,
  onViewClick,
  onCleanClick,
  resultsType
}) => {
  const handleBoxView = (bbox, image) => {
    onViewClick(bbox, image);
  };

  const handleCleanImage = bbox => {
    onCleanClick(bbox);
  };

  return (
    <Grid container xs={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center' />
            <TableCell align='center'>Warning Type</TableCell>
            <TableCell align='center'>Message</TableCell>
            <TableCell align='center'>Probability</TableCell>
            <TableCell align='center'>
              {resultsType[0].toUpperCase() + resultsType.slice(1)}
            </TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flaggedContent.map((value, index) => (
            <TableRow key={index}>
              <TableCell>
                <Warning
                  fontSize={'large'}
                  style={
                    value.probability > 80
                      ? { color: 'rgb(240, 87, 79)' }
                      : { color: 'rgb(240, 208, 79)' }
                  }
                />
              </TableCell>
              <TableCell align='center'>{value.type}</TableCell>
              <TableCell align='center'>{value.message}</TableCell>
              <TableCell align='center'>{value.probability}%</TableCell>
              <TableCell align='center'>
                {resultsType === 'image' ? (
                  <Avatar
                    src={value.image}
                    style={{ width: 100, height: 100 }}
                  />
                ) : (
                  <h1>Text goes here</h1>
                )}
              </TableCell>
              <TableCell align='center'>
                <IconButton
                  onClick={() => handleBoxView(value.box, value.image)}>
                  <Visibility />
                </IconButton>

                <IconButton onClick={() => handleCleanImage(value.box)}>
                  <Brush />
                </IconButton>

                <IconButton>
                  <DeleteForever />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};
