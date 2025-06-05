import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import Input from '../../components/Input';
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingShape from "../../components/FloatingShape";

function ForgetPassword() {

    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };

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
                className='max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primaryHover text-transparent bg-clip-text'>
                        Forgot Password
                    </h2>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p className='text-textSubtle mb-6 text-center'>
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <Input
                                icon={Mail}
                                type='email'
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='mt-4 w-full py-3 px-4 bg-gradient-to-r from-primary to-primaryHover text-white font-bold rounded-lg shadow-md hover:from-primaryHover hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-backgroundLight transition duration-200'
                                type='submit'
                            >
                                {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
                            </motion.button>
                        </form>
                    ) : (
                        <div className='text-center'>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'
                            >
                                <Mail className='h-8 w-8 text-white' />
                            </motion.div>
                            <p className='text-textSubtle mb-4'>
                                If an account exists for <b>{email}</b>, you will receive a password reset link shortly.
                            </p>
                        </div>
                    )}
                </div>

                <div className='px-8 py-4 bg-backgroundLight bg-opacity-50 flex justify-center'>
                    <Link to={"/login"} className='text-sm text-primary hover:underline flex items-center'>
                        <ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default ForgetPassword
