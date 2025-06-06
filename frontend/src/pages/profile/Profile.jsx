import React from 'react'
import { useAuthStore } from '../../store/authStore'

function Profile() {

    const {user} = useAuthStore();

  return (
    <div>
      {user.email}
      {user._id}
    </div>
  )
}

export default Profile
