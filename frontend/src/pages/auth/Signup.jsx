import FloatingShape from '../../components/FloatingShape'
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Lock, Mail, User, CheckCircle } from "lucide-react";
import { useState } from 'react';
import Input from '../../components/Input';
import { useAuthStore } from '../../store/authStore';

function signup() {

  const [email, setEmail] = useState("")
  const [fullname, setFullname] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { signup, error, isLoading } = useAuthStore();
  const [emailSent, setEmailSent] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, fullname);
      setEmailSent(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className='min-h-screen bg-gradient-to-br from-primary/20 via-primaryHover/20 to-backgroundLight flex items-center justify-center px-4 sm:px-6 relative overflow-hidden'>
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

            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primaryHover text-transparent bg-clip-text'>
              Signup
            </h2>

            {emailSent ? (<div className='text-center'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'
              >
                <Mail className='h-8 w-8 text-white' />
              </motion.div>
              <p className='text-textSubtle mb-4'>
                We’ve sent a verification link to your email address. Please click the link to activate your account.
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Didn’t receive it? Check your spam folder.
              </p>
            </div>) : (


              <form onSubmit={handleSignUp}>
                <Input
                  icon={User}
                  type='text'
                  placeholder='Full Name'
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
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
                <Input
                  icon={Lock}
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                <motion.button
                  className='mt-4 w-full py-3 px-4 bg-gradient-to-r from-primary to-primaryHover text-white font-bold rounded-lg shadow-md hover:from-primaryHover hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-backgroundLight transition duration-200'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
                </motion.button>
              </form>
            )}

          </div>
          <div className='px-8 py-4 bg-backgroundLight bg-opacity-60 flex justify-center'>
            <p className='text-sm text-textSubtle'>
              Already have an account?{" "}
              <Link to={"/login"} className='text-primary hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default signup
