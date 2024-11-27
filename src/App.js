// src/App.js
import React from 'react';
import './App.css';
import Search from './components/Search';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Search />
      </div>
    </ThemeProvider>
  );
}

export default App;
