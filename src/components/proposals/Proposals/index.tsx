import { useQuery } from '@apollo/client'
import React, { useState } from 'react'

import { GET_PROJECT } from '../../../gql/project'
import { isArrayEmpty } from '../../../lib/utils'
import Loader from '../../common/Loader'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ManageProject from '../../manageProject/ManageProject'
import ProposalList from '../ProposalList'

const Proposals = ({ data }) => {
  const [activeProjectId, setActiveProjectId] = useState(data[0]?.projectId)

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
  if (isArrayEmpty(data)) return <p>No proposals</p>
  if (loading || error) return <Loader open={loading} error={error} />
  return (
    <MasterDetailsLayout>
      <ProposalList data={data} currency={d.project.budget.currency} updateActiveProjectId={updateActiveProjectId} />
      <ManageProject data={d.project} isReadOnly />
    </MasterDetailsLayout>
  )
}
export default Proposals
