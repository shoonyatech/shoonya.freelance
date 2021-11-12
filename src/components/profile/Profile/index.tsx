import React from 'react'

import { UserIsReadOnlyContext } from '../../../context/isReadOnlyContext'
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

const Profile = ({ countries, data, isReadOnly }: Props) => (
  <UserIsReadOnlyContext.Provider value={isReadOnly}>
    <div className="max-w-5xl mx-auto w-full">
      <Heading data={data} />
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
        <ProfileSidebar data={data} page={1} />
        <ProfileMain data={data} page={1} />
      </div>
      <div className="my-10 flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
        <ProfileSidebar countries={countries} data={data} page={2} />
        <ProfileMain data={data} page={2} />
      </div>
    </div>
  </UserIsReadOnlyContext.Provider>
)
export default Profile

Profile.defaultProps = defaultProps
