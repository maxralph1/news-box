import React from 'react'

import { Routes, Route } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext.jsx';
// import PrivateRoute from './utils/PrivateRoute.jsx';
import Home from './views/Home.jsx';
import Register from './views/auth/Register.jsx';
import Login from './views/auth/Login.jsx';
// import Dashboard from './views/Dashboard.jsx';
// import Navbar from './components/Navbar.jsx';
// import './App.css'

function App() {
  return (
    <Routes>
      {/* <AuthProvider>*/}
        {/* <Navbar />  */}
        {/* <Switch> */}
          {/* <PrivateRoute> */}
            <Route element={<Home />} path='/' />
            <Route element={<Login />} path='/login' />
            <Route element={<Register />} path='/register' />
          {/* </PrivateRoute> */}
        {/* </Switch> */}
      {/* </AuthProvider> */}
    </Routes>
  )
}

export default App
