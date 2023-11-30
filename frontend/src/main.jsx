import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './app/store'
import { BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { storeTheme } from './storeTheme'
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={storeTheme}>
        <Router>
          <App />
          <ScrollToTop/>
        </Router>
      </ThemeProvider>
    </Provider>

  </React.StrictMode>,
)
