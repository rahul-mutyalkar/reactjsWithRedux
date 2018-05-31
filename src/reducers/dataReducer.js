import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  CHANGE_SEARCH_STRING
} from '../constants'

const initialState = {
  searchText: '',
  data: null,
  userArray: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function dataReducer(state = initialState, action) {
  // console.log("in state : ", state)
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: null,
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        userArray: action.data !== null ? [...state.userArray, action.data] : state.userArray,
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case CHANGE_SEARCH_STRING:
      return {
        ...state,
        searchText: action.text
      }

    default:
      return state
  }
}
