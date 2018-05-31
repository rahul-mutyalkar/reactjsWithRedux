import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { fetchData } from './actions';
import configureStore from './configureStore';
import './App.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.store = configureStore();
    this.delayedText = _.debounce(this.findUser.bind(this), 500);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const text = e.target.value;
    this.props.changeSearchString(text);
    if (text.length > 0) {
      this.delayedText(text)
    }
  }

  findUser() {
    // console.log('findUser() : ', this.props.appData);
    const text = this.props.appData.searchText.length > 0
      ? this.props.appData.searchText
      : '';
    const userExist = _.find(this.props.appData.userArray, user => user.login.toLowerCase() === text.toLowerCase());
    // console.log('userExist : ', userExist);
    if (userExist !== undefined) {
      this.props.appData.data = userExist;
    }
    if (userExist === undefined && text.length > 0) {
      this.props.fetchData(this.props.appData.searchText);
    }
  }
  render() {
    return (
      <div className="App">
        <h3>Find user</h3>
        <input type="text" placeholder="Type to search" onChange={this.handleChange} />
        { this.props.appData.dataFetched === false && this.props.appData.data !== null ?
          <div className="user_detail">
            <h1>User Details</h1>
            <p>{this.props.appData.data.name !== null ? this.props.appData.data.name : 'No name to show'}</p>
            <p>{this.props.appData.data.company !== null ? this.props.appData.data.company : 'No company to show'}</p>
            <p>{this.props.appData.data.email !== null ? this.props.appData.data.email : 'No email to show'}</p>
            {/* eslint-disable max-len */}
            {this.props.appData.data.avatar_url !== undefined && this.props.appData.data.avatar_url.length > 0
              ? <img className="logo" alt="" src={this.props.appData.data.avatar_url} /> : <p>No image to show</p> }
          </div> : null}
        {this.props.appData.isFetching === true ? <p>Loading</p> : null}
        { this.props.appData.searchText.length > 0 && this.props.appData.isFetching === false && this.props.appData.data === null ?
          <p>No user Found</p> : null}

      </div>);
  }
}

function mapStateToProps(state) {
  // console.log("store : ", state);
  return { appData: state.appData};
}

function mapDispatchToProps(dispatch) {
  // console.log('dispatch : ',dispatch)
  return {
    fetchData: text => dispatch(fetchData(text)),
    changeSearchString: (text) => {
      // console.log('changeSearchString : ',text)
      dispatch({ type: 'CHANGE_SEARCH_STRING', text });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
