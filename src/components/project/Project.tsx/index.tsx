import { useUser } from '@auth0/nextjs-auth0'
import React from 'react'

import { getUserId } from '../../../lib/user-helper'
import Loader from '../../common/Loader'
import ManageProject from '../../manageProject/ManageProject'

const Project = ({ data }) => {
  const { user, isLoading, error } = useUser()

  if (isLoading) return <Loader open={isLoading} error={error} />
  const userId = getUserId(user?.sub)
  const isProjectOwner = data.owner === userId
  return (
    <div>
      <ManageProject data={data} isReadOnly={!isProjectOwner} />
    </div>
  )
}

export default Project
