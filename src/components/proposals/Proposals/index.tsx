import React from 'react'

import { isArrayEmpty } from '../../../lib/utils'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import Profile from '../../profile/Profile'
import ProposalList from '../ProposalList'

const Proposals = ({ data, freelancers, updateActiveProject, activeFreelancer }) => {
  if (isArrayEmpty(freelancers)) return <p>No proposals</p>

  return (
    <MasterDetailsLayout>
      <ProposalList data={data} freelancers={freelancers} updateActiveProject={updateActiveProject} />
      <Profile data={activeFreelancer} isReadOnly />
    </MasterDetailsLayout>
  )
}
export default Proposals
