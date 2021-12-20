/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'

import { GET_USER_AND_PROPOSAL } from '../../../gql/user'
import { isArrayEmpty } from '../../../lib/utils'
import Loader from '../../common/Loader'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import FreelancerList from '../../freelancer/FreelancerList'
import Profile from '../../profile/Profile'
import ProposalCard from '../ProposalCard'


const Proposals = ({ data, proposals }) => {
  const [activeId, setactiveId] = useState({
    _id: data?.[0]?._id,
    proposalId: proposals[0]?._id,
  })
  const {
    error,
    loading,
    data: d,
    // refetch
  } = useQuery(GET_USER_AND_PROPOSAL, {
    variables: {
      _id: activeId?._id,
      proposalId: activeId?.proposalId,
    },
    // remove no-cache
    fetchPolicy: 'no-cache',
    skip: isArrayEmpty(data),
  })

  // const [refetchProposals, { loading: loadingProposals, error: errorProposals }] = useLazyQuery(GET_PROPOSALS_BY_PROJECT, {
  //   fetchPolicy: 'no-cache',
  //   onCompleted({  }) {
  //     setData()
  //     const newId = projects?.[0]?._id
  //     refetch({
  //       _id: activeId?._id,
  //       proposalId: activeId?.proposalId,
  //     })
  //   },
  // })


  const updateActiveProject = (newId) => {
    setactiveId({
      _id: data[newId]._id,
      proposalId: proposals[newId]._id,
    })
  }
  if (loading || error) return <Loader open={loading} error={error} />
  // if (loadingProposals || errorProposals) return <Loader open={loading} error={errorProposals} />

  if (isArrayEmpty(data)) return <p>No proposals</p>
  return (
    <MasterDetailsLayout>
      <FreelancerList data={data} updateActiveProject={updateActiveProject} />
      <div>
        <ProposalCard data={d.getProposalsById} />
        <Profile data={d.user} isReadOnly />
      </div>
    </MasterDetailsLayout>
  )
}
export default Proposals
