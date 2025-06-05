import FloatingShape from '../../components/FloatingShape'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader, Lock, Mail } from "lucide-react";
import { useState } from 'react';
import Input from '../../components/Input';
import { useAuthStore } from '../../store/authStore';

function login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password)
  };


  return (
    <>
      <div
        className='min-h-screen bg-gradient-to-br from-primary/25 via-primaryHover/25 to-backgroundLight flex items-center justify-center px-4 sm:px-6 relative overflow-hidden'>
        <FloatingShape color='bg-primary' size='w-64 h-64' top='-5%' left='10%' delay={0} />
        <FloatingShape color='bg-primaryHover' size='w-48 h-48' top='70%' left='80%' delay={5} />
        <FloatingShape color='bg-textSubtle' size='w-32 h-32' top='40%' left='-10%' delay={2} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-md w-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
          <div className='p-6 sm:p-8'>
            <h2 className='text-xl font-bold mb-4 text-center bg-gradient-to-r from-primary to-primaryHover text-transparent bg-clip-text'>
              BookSwap
            </h2>

            <h1 className='text-xl sm:text-2xl mb-4 text-textSubtle text-center'>
              Login
            </h1>

            <form onSubmit={handleLogin}>
              <Input
                icon={Mail}
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon={Lock}
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

              <div className='flex items-center mb-2'>
                <Link to='/forgot-password' className='text-sm text-primary hover:underline'>
                  Forgot password?
                </Link>
              </div>

              <motion.button
                className='mt-4 w-full py-3 px-4 bg-gradient-to-r from-primary to-primaryHover text-white font-bold rounded-lg shadow-md hover:from-primaryHover hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-backgroundLight transition duration-200'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Login"}
              </motion.button>
            </form>
          </div>
          <div className='px-8 py-4 bg-backgroundLight bg-opacity-60 flex justify-center'>
            <p className='text-sm text-textSubtle'>
              Don't have an account?{" "}
              <Link to={"/signup"} className='text-primary hover:underline'>
                Signup
              </Link>
            </p>
          </div>
        </motion.div>

      </div>
    </>
  )
}

export default login
