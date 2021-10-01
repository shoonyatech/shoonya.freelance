import React from 'react'

import Heading from '../Heading'
import ProfileMain from '../ProfileMain'
import ProfileSidebar from '../ProfileSidebar'

const Profile = () => (
  <div className="max-w-5xl mx-auto w-full">
    <Heading />

    <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
      <ProfileSidebar page={1} />
      <ProfileMain page={1} />
    </div>

    <div className="my-10 flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
      <ProfileSidebar page={2} />
      <ProfileMain page={2} />
    </div>
  </div>
)

export default Profile
