import {
  TableRow,
  TableCell,
  Button,
  IconButton,
  Table,
  TableBody,
  TableHead,
  DialogContent,
  DialogActions,
  DialogContentText,
  Avatar,
  Typography,
  Dialog
} from '@material-ui/core';
import React, { useState } from 'react';
import { Warning, Visibility, DeleteForever, Brush } from '@material-ui/icons';

export const ResultsTable = ({
  flaggedContent,
  onViewClick,
  onCleanClick,
  resultsType
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleViewContent = (bbox, content) => {
    if (resultsType === 'text') {
      setModalText(content);
      setModalOpen(true);
    } else {
      onViewClick(bbox, content);
    }
  };

  const handleCleanContent = (bbox, content) => {
    onCleanClick(bbox, content);
  };

  return (
    <div>
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
                  style={{ color: 'rgb(240, 87, 79)' }}
                />
              </TableCell>
              <TableCell align='center'>{value.type}</TableCell>
              <TableCell align='center'>{value.message}</TableCell>
              <TableCell align='center'>{value.probability}%</TableCell>
              <TableCell align='center'>
                {resultsType === 'photos' ? (
                  <Avatar
                    src={value.content}
                    style={{
                      width: 100,
                      height: 100,
                      margin: '0 auto'
                    }}
                  />
                ) : (
                  <Typography>{value.content.substring(0, 20)}...</Typography>
                )}
              </TableCell>
              <TableCell align='center'>
                <IconButton
                  onClick={() => handleViewContent(value.box, value.content)}>
                  <Visibility />
                </IconButton>

                <IconButton
                  style={
                    resultsType === 'photos'
                      ? { display: 'inline' }
                      : { display: 'none' }
                  }
                  onClick={() => handleCleanContent(value.box, value.content)}>
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

      {isModalOpen && (
        <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
          <DialogContent>
            <DialogContentText>
              <b>{modalText}</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
