// import { gql, useMutation } from '@apollo/client'
import React from 'react'

import Heading from '../Heading'
import ProfileMain from '../ProfileMain'
import ProfileSidebar from '../ProfileSidebar'

const Profile = () => (
  // const [addUser, { data, loading, error }] = useMutation(ADD_USER)

  <div className="max-w-5xl mx-auto w-full">
    <Heading />

    <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
      <ProfileSidebar />
      <ProfileMain />
    </div>
  </div>
)

export default Profile
