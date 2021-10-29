import { useUser } from '@auth0/nextjs-auth0'
import React from 'react'

import Loader from '../../common/Loader'
import ProjectHeading from '../ProjectHeading'
import ProjectMain from '../ProjectMain'
import ProjectSideBar from '../ProjectSideBar'

const ManageProject = ({ data }) => {
  const { user, isLoading, error } = useUser()

  if (isLoading) return <Loader open={isLoading} error={error} />

  const userId = user?.sub?.split('|')[1]

  return (
    <div className="max-w-5xl mx-auto w-full">
      <ProjectHeading data={data} userId={userId} />
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
        <ProjectSideBar data={data} userId={userId} />
        <ProjectMain data={data} userId={userId} />
      </div>
    </div>
  )
}

export default ManageProject
