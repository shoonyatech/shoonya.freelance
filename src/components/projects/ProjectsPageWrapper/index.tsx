/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import { GET_PROJECT } from '../../../gql/project'
import Loader from '../../common/Loader'
import Projects from '../Projects'

const ProjectsPageWrapper = ({ data, activeProjectId, updateActiveProjectId }) => {
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
  const updateActiveProject = (newId) => {
    updateActiveProjectId(newId)
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
        updateActiveProjectId={updateActiveProject}
      />
    </>
  )
}

export default ProjectsPageWrapper
