/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import Heading from '../Heading'
import ProfileMain from '../ProfileMain'
import ProfileSidebar from '../ProfileSidebar'

const Profile = ({ isReadOnly, userId }) => (
  <div className="max-w-5xl mx-auto w-full">
    <Heading isReadOnly={isReadOnly} userId={userId} />

    <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
      <ProfileSidebar isReadOnly={isReadOnly} userId={userId} page={1} />
      <ProfileMain isReadOnly={isReadOnly} userId={userId} page={1} />
    </div>

    <div className="my-10 flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
      <ProfileSidebar isReadOnly={isReadOnly} userId={userId} page={2} />
      <ProfileMain isReadOnly={isReadOnly} userId={userId} page={2} />
    </div>
  </div>
)

export default Profile
