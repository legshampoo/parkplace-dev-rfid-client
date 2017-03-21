import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import TokenButton from './components/TokenButton'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className='button-wrapper'>
          <TokenButton tokenName='Ap1' reference='1000'/>
          <TokenButton tokenName='Ap2' reference='2000'/>
          <TokenButton tokenName='Am' reference='3000'/>
          <TokenButton tokenName='N' reference='4000'/>
          <TokenButton tokenName='P1' reference='5000'/>
          <TokenButton tokenName='P2' reference='6000'/>
          <TokenButton tokenName='T' reference='7000'/>
        </div>
      </div>
    );
  }
}

export default App;
