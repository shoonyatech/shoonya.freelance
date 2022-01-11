import React from 'react'

const ProposalCard = ({ data }) => {
  const { coverLetter, proposedRate, currency } = data
  return (
    <div className="flex flex-col p-4">
      <p className="text-3xl py-1">Covering Letter</p>
      <p className="mb-4 mt-2">{coverLetter}</p>
      <p className="text-xl py-1">Proposed Rate</p>
      <p className="font-semibold">
        {currency}
        {proposedRate}
      </p>
    </div>
  )
}

export default ProposalCard
