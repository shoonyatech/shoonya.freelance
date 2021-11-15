import React from 'react'

import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ProposalList from '../ProposalList'

const Proposals = ({ data }) => (
  <MasterDetailsLayout>
    <ProposalList data={data} />
    <div />
  </MasterDetailsLayout>
)

export default Proposals
