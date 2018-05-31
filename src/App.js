import React from 'react';
// import logo from './logo.svg';
import { Provider } from 'react-redux';
import './App.css';
import configureStore from './configureStore';
import Input from './input';

const store = configureStore();
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Provider store={store}>
        <Input />
      </Provider>);
  }
}

export default App;
