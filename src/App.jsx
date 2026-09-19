import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Navbar from './vendorDashboard/components/Navbar';
import LandingPage from './vendorDashboard/pages/LandingPage';
import NotFound from './vendorDashboard/components/forms/NotFound';

import './App.css'



const App = () => {
  return <div>
    <Routes>
      <Route path="/" element={<LandingPage/>} /> 
      <Route path="/*" element={<NotFound/>} />
    </Routes>
  </div>
    
  
}

export default App;