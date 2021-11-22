import React from 'react'

import { isArrayEmpty } from '../../../lib/utils'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ProposalList from '../ProposalList'

const Proposals = ({ data }) => {
  if (isArrayEmpty(data)) return <p>No proposals</p>
  return (
    <MasterDetailsLayout>
      <ProposalList data={data} />
    </MasterDetailsLayout>
  )
}
export default Proposals
