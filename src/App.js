import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AccessDenied from './AuthScrens/AccessDenied';
import ForgotPassword from './AuthScrens/ForgotPassword';
import Login from './AuthScrens/Login';
import Otp from './AuthScrens/Otp';
import Register from './AuthScrens/Register';
import ResetPassword from './AuthScrens/ResetPassword';
import Posts from './Pages/Posts/Posts';
import Protectedoute from './routes/Protectedoute';
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
        <Route path={`${RouteStrings.forgotpassword}`} element={<ForgotPassword />} />
        <Route path={`${RouteStrings.resetpassword}`} element={<ResetPassword />} />
        <Route path={`${RouteStrings.accessdenied}`} element={<AccessDenied />} />
        <Route element={<Protectedoute />}>
          <Route path='/' element={<Posts />} />
          <Route path='/posts' element={<Posts />} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>

  )
}

export default App