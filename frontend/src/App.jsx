import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Routes, Route, Navigate } from "react-router";
import { Login, Signup, VerifyEmail, ForgotPassword, ResetPassword, Logout, Profile, Home } from './pages/index.js';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore.js';
import { useEffect } from 'react';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return children;
}

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children;
}

function App() {

  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth) {
    return <div className="text-center mt-8">Checking authentication...</div>;
  }

  return (
    <MantineProvider>
      <>
        <Routes>

          <Route path='/' element={<Home/>}/>

          <Route path='/login' element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          } />

          <Route path='/signup' element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          } />

          <Route path='/verify-email' element={<VerifyEmail />} />

          <Route path='/forgot-password' element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          } />

          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          } />

          <Route path='/reset-password/:token' element={
            <RedirectAuthenticatedUser>
              <ResetPassword/>
            </RedirectAuthenticatedUser>
          } />

          <Route path='/logout' element={
            <ProtectedRoute>
              <Logout/>
            </ProtectedRoute>
          } />

        </Routes>
        <Toaster />
      </>
    </MantineProvider>
  )
}

export default App
