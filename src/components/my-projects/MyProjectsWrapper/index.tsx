/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'

import { DELETE_PROJECT, GET_PROJECT } from '../../../gql/project'
import Loader from '../../common/Loader'
import SeeProposals from '../../project/actionBtns/SeeProposals'
import Projects from '../../projects/Projects'

const MyProjectsWrapper = ({ data, initialUserHasNoProjects, refreshData, isRefreshing }) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(data?.[0]?._id)
  const [listIndex, setListIndex] = useState(0)

  const [isUserHasNoProjects, setIsUserHasNoProjects] = useState(initialUserHasNoProjects)
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

  const [deleteProject] = useMutation(DELETE_PROJECT)

  const updateActiveProject = (newId, i) => {
    setActiveProjectId(newId)
    setListIndex(i)
    refetch({
      _id: newId,
    })
  }

  const deleteProjectHandler = () => {
    deleteProject({
      variables: {
        _id: activeProjectId,
      },
    })
    refreshData()
    const temp = (i) => data?.[i]?._id
    if (temp(listIndex - 1)) {
      setActiveProjectId(temp(listIndex - 1))
    } else if (temp(listIndex + 1)) {
      setActiveProjectId(temp(listIndex + 1))
    } else setIsUserHasNoProjects(true)
  }
  if (loading || error || isRefreshing) return <Loader open={loading} error={error} />
  if (isUserHasNoProjects) return <div>You have no projects</div>

  return (
    <div>
      <div className="flex justify-end py-2">
        <SeeProposals projectId={activeProjectId} />
        {/* todo : check if proposals are deleted for the project */}
        <Button onClick={() => deleteProjectHandler()} variant="contained" color="primary">
          Delete Project
        </Button>
      </div>
      <Projects
        data={data}
        activeProjectId={activeProjectId}
        projectData={d.project}
        updateActiveProjectId={updateActiveProject}
      />
    </div>
  )
}

export default MyProjectsWrapper
