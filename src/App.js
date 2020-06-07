import './App.css';
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Application from './Application';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App" >
            <Application></Application>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
