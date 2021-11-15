/* eslint-disable react/no-array-index-key */
import React from 'react'

import ProposalCard from '../ProposalCard'

const ProposalList = ({ data }) => (
  <div>
    {data.map((proposal, i) => (
      <ProposalCard coverLetter={proposal.coverLetter} budget={proposal.budget} key={i} />
    ))}
  </div>
)

export default ProposalList
