import { useQuery } from '@apollo/client'
import React from 'react'

import { GET_PROJECT } from '../../../gql/project'
import { GET_PROPOSAL_BY_ID } from '../../../gql/proposal'
import Loader from '../../common/Loader'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ProjectList from '../../project/ProjectList'
import ProposalDetails from '../ProposalDetails'

const MyProposals = ({ data, activeProposalId, updateActiveProposalId }) => {
  const {
    error,
    loading,
    data: d,
    refetch,
  } = useQuery(GET_PROPOSAL_BY_ID, {
    variables: {
      _id: activeProposalId,
    },
  })
  const {
    error: projectErr,
    loading: projectLoading,
    data: projectDetails,
  } = useQuery(GET_PROJECT, {
    variables: {
      _id: d?.getProposalsById?.projectId,
    },
  })
  const updateActiveProposal = (newId) => {
    updateActiveProposalId(newId)
    refetch({
      _id: newId,
    })
  }

  if (loading || !projectDetails) return <Loader open={loading} error={error} />
  if (projectLoading || !projectDetails) return <Loader open={projectLoading} error={projectErr} />

  return (
    <MasterDetailsLayout>
      <ProjectList data={data} activeProposalId={activeProposalId} updateActiveProposalId={updateActiveProposal} />
      <ProposalDetails data={d.getProposalsById} projectDetails={projectDetails.project} />
    </MasterDetailsLayout>
  )
}

export default MyProposals
