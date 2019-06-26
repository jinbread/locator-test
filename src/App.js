import React from 'react';
import './App.css';
import { Locator } from './Locator';
import { Compass } from './compass';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Compass />
        <Locator />
      </header>
    </div>
  );
}

export default App;
