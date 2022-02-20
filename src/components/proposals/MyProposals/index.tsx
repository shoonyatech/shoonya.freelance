/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'

import { DELETE_PROPOSAL, GET_PROJECT_BY_ID_AND_PROPOSAL_BY_ID } from '../../../gql/proposal'
import Loader from '../../common/Loader'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ManageProject from '../../manageProject/ManageProject'
import ProjectList from '../../project/ProjectList'
import ProposalCard from '../ProposalCard'

const MyProposals = ({ data, refreshData, isRefreshing, initialIsUserHasNoProposals }) => {
  const getProjectAndProposalId = (i) => ({
    project: data?.[i]?.projectId,
    proposal: data?.[i]?._id,
    index: 0,
  })
  const [isUserHasNoProposals, setIsUserHasNoProposals] = useState(initialIsUserHasNoProposals)
  const initialVal = getProjectAndProposalId(0)
  const [activeId, setActiveId] = useState(initialVal)
  const updateActiveId = (newActiveId) => setActiveId(newActiveId)

  const {
    error,
    loading,
    data: rightPanelData,
  } = useQuery(GET_PROJECT_BY_ID_AND_PROPOSAL_BY_ID, {
    variables: {
      _id: activeId.project,
      proposalId: activeId.proposal,
    },
    skip: initialIsUserHasNoProposals,
  })
  const [deleteProposal] = useMutation(DELETE_PROPOSAL)

  const updateActiveProject = (newActiveId) => {
    updateActiveId(newActiveId)
  }

  const deleteProposalHandle = () => {
    deleteProposal({
      variables: {
        _id: activeId.proposal,
      },
    })
    refreshData()
    const temp = (i) => data?.[i]?._id
    if (temp(activeId.index - 1)) {
      setActiveId(getProjectAndProposalId(activeId.index - 1))
    } else if (temp(activeId.index + 1)) {
      setActiveId(getProjectAndProposalId(activeId.index + 1))
    } else setIsUserHasNoProposals(true)
  }

  if (loading || error || isRefreshing) return <Loader open={loading} error={error} />
  if (isUserHasNoProposals) return <div  >You have no proposals</div>

  return (
    <MasterDetailsLayout>
      <ProjectList data={data} updateActiveProject={updateActiveProject} activeId={activeId} />
      <div>
        <div className="flex justify-end p-2">
          <Button onClick={() => deleteProposalHandle()} variant="contained" color="primary">
            Delete Proposal
          </Button>
        </div>
        <ProposalCard data={rightPanelData.getProposalsById} />
        <ManageProject data={rightPanelData.project} isReadOnly />
      </div>
    </MasterDetailsLayout>
  )
}
export default MyProposals
