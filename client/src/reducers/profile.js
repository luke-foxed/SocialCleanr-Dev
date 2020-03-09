import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
  site: null,
  photos: [],
  text: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        photos: payload.photos,
        text: payload.text,
        site: payload.site,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
