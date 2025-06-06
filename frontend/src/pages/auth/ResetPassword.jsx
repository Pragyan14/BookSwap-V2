import { useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import Input from '../../components/Input';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { Loader, Lock } from "lucide-react";
import toast from "react-hot-toast";
import FloatingShape from '../../components/FloatingShape';

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const { token } = useParams();
    const navigate = useNavigate();

    const { error, isLoading, resetPassword, message } = useAuthStore()

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(password !== confirmPassword){ 
            alert("Passwords do not match");
            return;
        }

        try {
            await resetPassword(token,password);
            toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message || "Error resetting password");
        }
    }

    return (
        <div
            className='min-h-screen bg-gradient-to-br from-primary/20 via-primaryHover/20 to-backgroundLight flex items-center justify-center px-4 sm:px-6 relative overflow-hidden'>
            <FloatingShape color='bg-primary' size='w-64 h-64' top='-5%' left='10%' delay={0} />
            <FloatingShape color='bg-primaryHover' size='w-48 h-48' top='70%' left='80%' delay={5} />
            <FloatingShape color='bg-textSubtle' size='w-32 h-32' top='40%' left='-10%' delay={2} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primaryHover text-transparent bg-clip-text'>
                        Reset Password
                    </h2>
                    {/* {error && <p className='text-red-500 text-sm mb-4'>{error}</p>} */}

                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='New Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='Confirm New Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <motion.button
                            className='mt-4 w-full py-3 px-4 bg-gradient-to-r from-primary to-primaryHover text-white font-bold rounded-lg shadow-md hover:from-primaryHover hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-backgroundLight transition duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader  className=' animate-spin mx-auto' size={24} /> : "Set New Password"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>

        </div>
    )
}

export default ResetPassword
