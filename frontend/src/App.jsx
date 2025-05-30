import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Routes, Route } from "react-router";
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail.jsx';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <MantineProvider>
      <>
        <Routes>
          <Route path='/' element={"Home"}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/verify-email' element={<VerifyEmail/>}></Route>
        </Routes>
        <Toaster/>
      </>
    </MantineProvider>
  )
}

export default App
