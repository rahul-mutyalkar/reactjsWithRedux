import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
} from './constants';
import getPeople from './api';

export function getData() {
  return {
    type: FETCHING_DATA,
  };
}

export function getDataSuccess(data) {
  // console.log("getDataSuccess : ")
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  };
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE,
  };
}


export function fetchData(string) {
  // console.log('string : ', string);
  return (dispatch) => {
    dispatch(getData());
    getPeople(string)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            // console.log('API hitted : ')
            dispatch(getDataSuccess(data));
          });
        } else {
          dispatch(getDataSuccess(null));
        }
        // console.log("response : ", response.json())
      })
      .catch((err) => { // eslint-disable-line no-unused-vars
        // console.log('err:', err)
      });
  };
}
