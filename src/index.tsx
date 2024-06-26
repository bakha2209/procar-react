import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './app/App'
import reportWebVitals from './reportWebVitals'
import '../src/css/index.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './app/MaterialTheme'
import ReactDOM from 'react-dom'
import { SocketContext, socket } from './app/context/socket'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
          <SocketContext.Provider value={socket}>
            <App />
          </SocketContext.Provider>
        </React.StrictMode>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
