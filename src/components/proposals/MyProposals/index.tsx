import React from 'react'

import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ProposalCard from '../ProposalCard'

const MyProposals = ({ data }) => (
  <MasterDetailsLayout>
    <div />
    <ProposalCard data={data[0]} />
  </MasterDetailsLayout>
)

export default MyProposals
