/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'

import { GET_PROJECT } from '../../../gql/project'
import Loader from '../../common/Loader'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ManageProject from '../../manageProject/ManageProject'
import ProjectList from '../ProjectList'

const Projects = ({ data }) => {
  const [activeProjectId, setActiveProjectId] = useState(data[0]._id)
  const {
    error,
    loading,
    data: d,
    refetch,
  } = useQuery(GET_PROJECT, {
    variables: {
      _id: activeProjectId,
    },
  })
  const updateActiveProjectId = (newId) => {
    setActiveProjectId(newId)
    refetch({
      _id: newId,
    })
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <MasterDetailsLayout>
      <ProjectList activeProjectId={activeProjectId} updateActiveProjectId={updateActiveProjectId} data={data} />
      <ManageProject data={d.project} isReadOnly />
    </MasterDetailsLayout>
  )
}

export default Projects
