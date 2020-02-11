import {
  TableRow,
  TableCell,
  Button,
  IconButton,
  Table,
  TableBody,
  TableHead
} from '@material-ui/core';
import React from 'react';
import { Warning, Visibility, DeleteForever } from '@material-ui/icons';

export const ResultsTable = ({ flaggedContent, onViewClick }) => {
  const handleBoxView = bbox => {
    onViewClick(bbox);
  };

  return (
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
              <IconButton onClick={() => handleBoxView(value.box)}>
                <Visibility />
              </IconButton>
              <IconButton>
                <DeleteForever />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
