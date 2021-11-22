/* eslint-disable react/no-array-index-key */
import React from 'react'

import ProposalCard from '../ProposalCard'

const ProposalList = ({ data }) => (
  <div className="flex flex-col">
    {data.map((proposal, i) => (
      <ProposalCard data={proposal} key={i} />
    ))}
  </div>
)

export default ProposalList
