import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NavBar from './components/NavBar';
import Posts from './Pages/Posts/Posts';
import Pages from './Pages';
import { Route, Routes } from 'react-router-dom';
import Login from './AuthScrens/Login';
import Protectedoute from './routes/Protectedoute';
import Register from './AuthScrens/Register';
import Otp from './AuthScrens/Otp';
import { RouteStrings } from './routes/RouteStrings';
const App = () => {
  return (
    <>
      {/* <NavBar />
      <Posts /> */}
      {/* <Pages /> */}
      <Routes>
        <Route path={RouteStrings.login} element={<Login />} />
        <Route path={RouteStrings.register} element={<Register />} />
        <Route path={`${RouteStrings.otp}/:email`} element={<Otp />} />
        <Route element={<Protectedoute />}>
          <Route path='/posts' element={<Posts />} />
        </Route>
      </Routes>
    </>

  )
}

export default App