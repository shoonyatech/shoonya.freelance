import { useUser } from '@auth0/nextjs-auth0'
import React from 'react'

import { getUserId } from '../../../lib/user-helper'
import { UserIsReadOnlyContext } from '../../../src/context/isReadOnlyContext'
import Loader from '../../common/Loader'
import Heading from '../Heading'
import ProfileMain from '../ProfileMain'
import ProfileSidebar from '../ProfileSidebar'

interface Props {
  isReadOnly?: any
  data: any
  countries: any
}

const defaultProps = {
  isReadOnly: false,
}

const Profile = ({ countries, data, isReadOnly }: Props) => {
  const { user, isLoading, error } = useUser()
  const userId = getUserId(user?.sub)
  if (isLoading) return <Loader open={isLoading} error={error} />
  return (
    <UserIsReadOnlyContext.Provider value={isReadOnly}>
      <div className="max-w-5xl mx-auto w-full">
        <Heading data={data} userId={userId} />
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
          <ProfileSidebar countries={countries} userId={userId} data={data} page={1} />
          <ProfileMain userId={userId} data={data} page={1} />
        </div>
        <div className="my-10 flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
          <ProfileSidebar countries={countries} userId={userId} data={data} page={2} />
          <ProfileMain userId={userId} data={data} page={2} />
        </div>
      </div>
    </UserIsReadOnlyContext.Provider>
  )
}
export default Profile

Profile.defaultProps = defaultProps
