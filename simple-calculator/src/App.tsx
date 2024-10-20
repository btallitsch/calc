import React from 'react';
import './App.css';
import Calculator from './Calculator';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Simple Calculator</h1>
      <Calculator />
    </div>
  );
};

export default App;
