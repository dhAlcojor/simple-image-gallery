import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Provider from "./context/FirebaseContext";
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import AuthProvider from "./context/AuthContext";
import Layout from "./components/Layout";
import Stocks from "./components/Stocks";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <AuthProvider>
        <Provider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/stocks" element={<Stocks/>}/>
              </Routes>
            </Layout>
          </Router>
        </Provider>
      </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
