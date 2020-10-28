import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from '../MainContainer/MainContainer';

import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainContainer />
      </BrowserRouter>
    );
  }
}
export default App;
