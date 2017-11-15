import React, { Component } from 'react';
import Header from './components/Header/';
import Hero from './components/Hero/';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Hero />
      </div>
    );
  }
}

export default App;
