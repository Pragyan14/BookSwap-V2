import FloatingShape from '../../components/FloatingShape'
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { Loader } from "lucide-react";
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {

  const { verifyEmail, error, isLoading } = useAuthStore();

  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get('verificationToken');
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async() => {
      try {
        await verifyEmail(verificationToken);
        navigate("/login");
        toast.success("Email verified successfully please login");
      } catch (error) {
        console.error(error);
        toast.error("Failed to verify email");
      }
    };
    if (verificationToken) verify();
  },[verificationToken])

  return (
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
          <h1 className='text-2xl font-bold sm:text-2xl mb-4 text-textSubtle text-center'>BookSwap</h1>
          {isLoading ? (
            <div className='text-center'>
              <p>Verifying email, please wait...</p>
              <Loader className=' animate-spin mx-auto mt-4' size={24} />
            </div>
          ) : "Try again"}
          {error && <p className='text-red-500 text-center font-semibold mt-2'>{error}</p>}

        </div>

      </motion.div>

    </div>
  )
}

export default VerifyEmail
