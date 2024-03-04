import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidemenubar from './components/Sidemenubar';
import Router from './routes/index'
import Footer from './components/Footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <div className="rootContainer" >
      <div id="body-container">
        <Navbar />
        <div className="flex">
          <div className="w-64">
            <Sidemenubar />
          </div>
          <div className="content flex-1 w-full" >
            <div className="page">
              {Router}
              <ToastContainer />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </BrowserRouter>
</React.StrictMode>
);
