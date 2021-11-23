import React from 'react'

import { isArrayEmpty } from '../../../lib/utils'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ProposalList from '../ProposalList'

const Proposals = ({ freelancers }) => {
  if (isArrayEmpty(freelancers)) return <p>No proposals</p>
  return (
    <MasterDetailsLayout>
      <ProposalList freelancers={freelancers} />
    </MasterDetailsLayout>
  )
}
export default Proposals
