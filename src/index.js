import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Homepage from "./Homepage";
import Layout from "./Layout";
import reportWebVitals from "./reportWebVitals";
import {MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes
 } from "react-router-dom";
import DictionaryButton from "./components/DictionaryButton";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="light">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Layout" element={<Layout />} />
          <Route path="/DictionaryButton" element={<DictionaryButton/>} />
        </Routes>
      </Router>
    </MantineProvider>
  </React.StrictMode>
);

reportWebVitals();
