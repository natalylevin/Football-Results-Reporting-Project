import './App.css';
import { AppContextProvider } from './hooks';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffa726'
    }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <BrowserRouter>
            <AppContainer />
          </BrowserRouter>
        </AppContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
