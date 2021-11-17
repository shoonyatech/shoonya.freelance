/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import { GET_PROJECT } from '../../../gql/project'
import Loader from '../../common/Loader'
import Projects from '../Projects'

const ProjectsPageWrapper = ({ data }) => {
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
    <>
      <Projects
        data={data}
        activeProjectId={activeProjectId}
        projectData={d.project}
        updateActiveProjectId={updateActiveProjectId}
      />
    </>
  )
}

export default ProjectsPageWrapper
