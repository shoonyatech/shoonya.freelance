/* eslint-disable react/no-array-index-key */
import React from 'react'

import ProposalCard from '../ProposalCard'

const ProposalList = ({ data, updateActiveProjectId, currency }) => (
  <div className="flex flex-col">
    {data.map((proposal, i) => (
      <ProposalCard updateActiveProjectId={updateActiveProjectId} data={proposal} currency={currency} key={i} />
    ))}
  </div>
)

export default ProposalList
