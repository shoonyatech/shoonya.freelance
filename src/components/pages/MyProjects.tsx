import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import Button from '@mui/material/Button'
import React from 'react'

import { DELETE_PROJECT, GET_PROJECT, GET_USER_PROJECTS } from '../../gql/project'
import { isArrayEmpty } from '../../lib/utils'
import Loader from '../common/Loader'
import SeeProposals from '../project/actionBtns/SeeProposals'
import Projects from '../projects/Projects'

export const MyProjects = () => {
  const [loadActiveProject, activeProject] = useLazyQuery(GET_PROJECT)

  const { error, loading, data, refetch } = useQuery(GET_USER_PROJECTS, {
    async onCompleted({ getUserProjects }) {
      if (Array.isArray(getUserProjects) && getUserProjects.length) {
        await loadActiveProject({
          variables: {
            _id: getUserProjects?.[0]?._id,
          },
        })
      }
    },
  })

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    async onCompleted() {
      refetch()
    },
  })

  const updateActiveProject = async (newId) => {
    await loadActiveProject({
      variables: { _id: newId },
    })
  }

  const deleteProjectHandler = () => {
    const { _id } = activeProject.data.project
    deleteProject({ variables: { _id } })
  }

  if (loading || error) return <Loader open={loading} error={error} />
  if (activeProject.loading || activeProject.error)
    return <Loader open={activeProject.loading} error={activeProject.error} />
  if (isArrayEmpty(data.getUserProjects)) return <div>You have no projects</div>

  if (activeProject.data)
    return (
      <div>
        <div className="flex justify-end py-2">
          <SeeProposals projectId={activeProject.data.project?._id} />
          {/* todo : check if proposals are deleted for the project */}
          <Button onClick={() => deleteProjectHandler()} variant="contained" color="primary">
            Delete Project
          </Button>
        </div>
        <Projects
          data={data.getUserProjects}
          activeProject={activeProject.data.project}
          updateActiveProjectId={updateActiveProject}
        />
      </div>
    )
  return null
}
