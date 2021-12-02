import { useQuery } from '@apollo/client'
import React from 'react'

import { GET_PROJECT_BY_ID_AND_PROPOSAL_BY_ID } from '../../../gql/proposal'
import Loader from '../../common/Loader'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ManageProject from '../../manageProject/ManageProject'
import ProjectList from '../../project/ProjectList'
import ProposalCard from '../ProposalCard'

const MyProposals = ({ data, updateActiveId, activeId }) => {
  const {
    error,
    loading,
    data: rightPanelData,
    refetch,
  } = useQuery(GET_PROJECT_BY_ID_AND_PROPOSAL_BY_ID, {
    variables: {
      _id: activeId.project,
      proposalId: activeId.proposal,
    },
  })

  const updateActiveProject = (newActiveId) => {
    updateActiveId(newActiveId)
    refetch({
      _id: newActiveId.project,
      proposalId: newActiveId.proposal,
    })
  }

  if (loading || error) return <Loader open={loading} error={error} />

  return (
    <MasterDetailsLayout>
      <ProjectList data={data} updateActiveProject={updateActiveProject} activeId={activeId} />
      <div>
        <ProposalCard data={rightPanelData.getProposalsById} />
        <ManageProject data={rightPanelData.project} isReadOnly />
      </div>
    </MasterDetailsLayout>
  )
}
export default MyProposals
