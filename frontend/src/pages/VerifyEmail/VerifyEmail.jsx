import FloatingShape from '../../components/FloatingShape'
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';

function VerifyEmail() {

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRefs = useRef([])
  const isLoading = false;

  const handleChange = (index,value) => {
    const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
  }

  const handleKeyDown = (index,e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
  }

  const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		// try {
		// 	await verifyEmail(verificationCode);
		// 	navigate("/");
		// 	toast.success("Email verified successfully");
		// } catch (error) {
		// 	console.log(error);
		// }
    console.log(verificationCode)
	};

  useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

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

          <h1 className='text-2xl font-bold sm:text-2xl mb-4 text-textSubtle text-center'>Verify Your Email</h1>

          <p className='text-center text-sm text-textSubtle mb-4'>Enter the 6-digit code sent to your email</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className='flex justify-between'>
              {code.map((digit,index) => (
                <input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-[#D9EAFD]/25 text-textMain border-2 border-textSubtle/50 rounded-lg focus:border-primary focus:outline-none'
							/>
              ))}
            </div>

              <motion.button
                className='mt-2 w-full py-3 px-4 bg-gradient-to-r from-primary to-primaryHover text-white font-bold rounded-lg shadow-md hover:from-primaryHover hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-backgroundLight transition duration-200'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </motion.button>

          </form>

        </div>

      </motion.div>

    </div>
  )
}

export default VerifyEmail
