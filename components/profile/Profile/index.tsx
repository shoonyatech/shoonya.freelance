/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import Heading from '../Heading'
import ProfileMain from '../ProfileMain'
import ProfileSidebar from '../ProfileSidebar'

const Profile = ({ data, display, userId }) => (
  <div className="max-w-5xl mx-auto w-full">
    <Heading data={data} display={display} userId={userId} />

    <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
      <ProfileSidebar display={display} userId={userId} page={1} />
      <ProfileMain display={display} userId={userId} page={1} />
    </div>

    <div className="my-10 flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
      <ProfileSidebar display={display} userId={userId} page={2} />
      <ProfileMain display={display} userId={userId} page={2} />
    </div>
  </div>
)

export default Profile
