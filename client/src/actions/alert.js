import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';


/**
 * Set alerts using redux
 * @param {string} msg - Message to be displayed
 * @param {string} alertType - Alert type (success, warning, error)
 */

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
