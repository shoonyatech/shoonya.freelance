import { useUser } from '@auth0/nextjs-auth0'
import React from 'react'

import { isReadOnlyContext } from '../../../hooks/useIsReadOnlyContext'
import Loader from '../../common/Loader'
import ProjectHeading from '../ProjectHeading'
import ProjectMain from '../ProjectMain'
import ProjectSideBar from '../ProjectSideBar'

interface Props {
  data: object
  isReadOnly?: any
}

const defaultProps = {
  isReadOnly: false,
}

const ManageProject = ({ data, isReadOnly }: Props) => {
  const { user, isLoading, error } = useUser()

  if (isLoading) return <Loader open={isLoading} error={error} />

  const userId = user?.sub?.split('|')[1]
  return (
    <isReadOnlyContext.Provider value={isReadOnly}>
      <div className="max-w-5xl mx-auto w-full lg:min-h-screen lg:flex lg:flex-col">
        <ProjectHeading data={data} userId={userId} />
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile lg:flex-1">
          <ProjectSideBar data={data} userId={userId} />
          <ProjectMain data={data} userId={userId} />
        </div>
      </div>
    </isReadOnlyContext.Provider>
  )
}

export default ManageProject

ManageProject.defaultProps = defaultProps
