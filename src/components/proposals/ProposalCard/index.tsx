import React from 'react'

const ProposalCard = ({ data }) => {
  const { coverLetter, proposedRate, currency } = data
  return (
    <div className="flex flex-col p-4">
      <p className="text-3xl py-1">Cover Letter</p>
      <p>{coverLetter}</p>
      <p className="text-xl py-1">
        Proposed Rate :{' '}
        <span className="font-semibold">
          {currency}
          {proposedRate}
        </span>
      </p>
    </div>
  )
}

export default ProposalCard
