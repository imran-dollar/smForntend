import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NavBar from './components/NavBar';
import Posts from './Pages/Posts/Posts';
import Pages from './Pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './AuthScrens/Login';
import Protectedoute from './routes/Protectedoute';
import Register from './AuthScrens/Register';
import Otp from './AuthScrens/Otp';
import { RouteStrings } from './routes/RouteStrings';
import ForgotPassword from './AuthScrens/ForgotPassword';
import ResetPassword from './AuthScrens/ResetPassword';
import AccessDenied from './AuthScrens/AccessDenied';
const App = () => {
  return (
    <>
      {/* <NavBar />
      <Posts /> */}
      {/* <Pages /> */}
      <Routes>
        <Route path={RouteStrings.login} element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path={RouteStrings.register} element={<Register />} />
        <Route path={`${RouteStrings.otp}/:email`} element={<Otp />} />
        <Route path={`${RouteStrings.forgotpassword}`} element={<ForgotPassword />} />
        <Route path={`${RouteStrings.resetpassword}`} element={<ResetPassword />} />
        <Route path={`${RouteStrings.accessdenied}`} element={<AccessDenied />} />
        <Route element={<Protectedoute />}>
          <Route path='/posts' element={<Posts />} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>

  )
}

export default App