import { useQuery } from '@apollo/client'
import React from 'react'

import { GET_PROJECT } from '../../../gql/project'
import Loader from '../../common/Loader'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ManageProject from '../../manageProject/ManageProject'
import ProjectList from '../../project/ProjectList'

const MyProposals = ({ data, activeProjectId, updateActiveProjectId }) => {
  const {
    error,
    loading,
    data: projectData,
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

  if (loading || error) return <Loader open={loading} error={error} />

  return (
    <MasterDetailsLayout>
      <ProjectList data={data} updateActiveProject={updateActiveProject} activeProjectId={activeProjectId} />
      <div>
        <ManageProject data={projectData.project} isReadOnly />
      </div>
    </MasterDetailsLayout>
  )
}
export default MyProposals
