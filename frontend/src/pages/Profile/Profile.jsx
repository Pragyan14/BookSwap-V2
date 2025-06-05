import React from 'react'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Profile() {

    const {user, logout} = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await logout();
        navigate("/login");
        toast.success("user logged out successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to logout");
      }
    }
 
  return (
    <div>
      <p>Welcome {user.fullname}</p>
      <p>last login: {user.lastLogin}</p>
      <button onClick={handleLogout} className='border 1 border-red-700 cursor-pointer'>LOGOUT</button>
    </div>
  )
}

export default Profile
