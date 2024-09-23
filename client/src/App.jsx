import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'

const RouteComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </Router>
  )}

const App = () => {
  return (
    <div>
      <RouteComponent />
    </div>
  )
}

export default App