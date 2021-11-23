import React from 'react'

import { isArrayEmpty } from '../../../lib/utils'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ProposalList from '../ProposalList'

const Proposals = ({ data, freelancers }) => {
  if (isArrayEmpty(freelancers)) return <p>No proposals</p>
  return (
    <MasterDetailsLayout>
      <ProposalList data={data} freelancers={freelancers} />
    </MasterDetailsLayout>
  )
}
export default Proposals
