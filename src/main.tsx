import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ToastContainer} from 'react-toastify';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer position="bottom-left"/>
        <App/>
      </BrowserRouter>,
    </Provider>
  </React.StrictMode>,
)
