import React, { Component } from 'react';

import Grid from './components/Grid';
import Console from './components/Console';
import Instructions from './components/Instructions';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <h1 className="app-title">Toy robot challenge</h1>
        </header>
        <div className="app-container">
          <Grid size={{ rows: 5, columns: 5}} width="600" />
          <Console />
        </div>
        <div className="app-container">
          <Instructions />
        </div>
      </div>
    );
  }
}

export default App;