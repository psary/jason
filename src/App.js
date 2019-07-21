import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JsonApp from './component/JsonApp';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
  },
)
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <JsonApp></JsonApp>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
