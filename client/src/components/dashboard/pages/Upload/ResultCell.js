import { TableRow, TableCell, Button, IconButton } from '@material-ui/core';
import React from 'react';
import { Warning, Visibility, DeleteForever } from '@material-ui/icons';
import { useCallback } from 'react';

export const ResultCell = ({ props, onViewClick }) => {
  return (
    <TableRow>
      <TableCell>
        <Warning
          fontSize={'large'}
          style={
            props.probability > 80
              ? { color: 'rgb(240, 87, 79)' }
              : { color: 'rgb(240, 208, 79)' }
          }
        />
      </TableCell>
      <TableCell align='center'>{props.type}</TableCell>
      <TableCell align='center'>{props.message}</TableCell>
      <TableCell align='center'>{props.probability}%</TableCell>
      <TableCell align='center'>
        <IconButton onClick={onViewClick}>
          <Visibility />
        </IconButton>
        <IconButton>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
