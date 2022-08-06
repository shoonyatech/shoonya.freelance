import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import Button from '@mui/material/Button'
import React from 'react'

import { DELETE_PROPOSAL, GET_PROJECT_BY_ID_AND_PROPOSAL_BY_ID, GET_USER_PROPOSALS } from '../../gql/proposal'
import { isArrayEmpty } from '../../lib/utils'
import Loader from '../common/Loader'
import MasterDetailsLayout from '../common/MasterDetailsLayout'
import ManageProject from '../manageProject/ManageProject'
import ProjectListForProposals from '../project/ProjectList'
import ProposalCard from '../proposals/ProposalCard'

export const MyProposal = () => {
  const [loadActiveProjectAndProposal, { loading: activeLoading, error: activeError, data: activeData }] = useLazyQuery(
    GET_PROJECT_BY_ID_AND_PROPOSAL_BY_ID
  )

  const { error, loading, data, refetch } = useQuery(GET_USER_PROPOSALS, {
    async onCompleted({ getUserProposals }) {
      if (Array.isArray(getUserProposals) && getUserProposals.length) {
        await loadActiveProjectAndProposal({
          variables: {
            _id: getUserProposals?.[0]?.projectId,
            proposalId: getUserProposals?.[0]?._id,
          },
        })
      }
    },
  })

  const [deleteProposal] = useMutation(DELETE_PROPOSAL, {
    async onCompleted() {
      refetch()
    },
  })
  const deleteProposalHandle = () => {
    const { projectId } = activeData.getProposalsById
    const { _id } = activeData.getProposalsById
    deleteProposal({
      variables: { projectId, _id },
    })
  }

  const updateActiveProject = async ({ projectId, proposalId }) => {
    await loadActiveProjectAndProposal({
      variables: { _id: projectId, proposalId },
    })
  }

  if (loading || error) return <Loader open={loading} error={error} />
  if (activeLoading || activeError) return <Loader open={activeLoading} error={activeError} />
  if (isArrayEmpty(data.getUserProposals)) return <div>You have no proposals</div>

  return (
    <MasterDetailsLayout>
      {activeData && (
        <>
          <ProjectListForProposals
            data={data.getUserProposals}
            updateActiveProject={updateActiveProject}
            activeId={activeData.getProposalsById._id}
          />
          <div>
            <div className="flex justify-end p-2">
              <Button onClick={() => deleteProposalHandle()} variant="contained" color="primary">
                Delete Proposal
              </Button>
            </div>

            <ProposalCard data={activeData.getProposalsById} />
            <ManageProject data={activeData.project} isReadOnly />
          </div>
        </>
      )}
    </MasterDetailsLayout>
  )
}
