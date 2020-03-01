import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alerter = ({ alerts }) =>
  alert !== null &&
  alerts.map(alert => (
    <Snackbar
      key={alert.id}
      open={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert
        elevation={6}
        variant='filled'
        severity={alert.alertType}
        key={alert.id}>
        {alert.msg}
      </Alert>
    </Snackbar>
  ));

Alerter.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alerter);
