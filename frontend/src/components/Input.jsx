const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-4 sm:mb-6'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='w-4 h-4 sm:size-5 text-primary' />
			</div>
			<input
			    // #3F8FAFC  input bg color alt
				{...props}
				className='w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-sm sm:text-base
        bg-[#D9EAFD]/25 rounded-lg border border-primary 
        focus:border-primaryHover focus:ring-2 focus:ring-primaryHover 
        focus:outline-none text-textMain placeholder-textSubtle 
        transition duration-200'
			/>
		</div>
	);
};
export default Input;
