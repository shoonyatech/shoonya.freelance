import React from 'react'

import { isArrayEmpty } from '../../../lib/utils'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import Profile from '../../profile/Profile'
import ProposalList from '../ProposalList'

const Proposals = ({ data, freelancers }) => {
  if (isArrayEmpty(freelancers)) return <p>No proposals</p>
  return (
    <MasterDetailsLayout>
      <ProposalList data={data} freelancers={freelancers} />
      <Profile data={freelancers[0]} isReadOnly />
    </MasterDetailsLayout>
  )
}
export default Proposals
