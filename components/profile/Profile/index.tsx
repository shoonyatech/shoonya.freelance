import React from 'react'

import ProfileMain from '../ProfileMain'
import ProfileOthers from '../ProfileSidebar'

const Profile = () => (
  <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile w-full  lg:min-h-screen  max-w-7xl mx-auto">
    <ProfileOthers />
    <ProfileMain />
  </div>
)

export default Profile
