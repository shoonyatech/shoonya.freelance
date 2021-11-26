import React from 'react'

const ProposalCard = ({ data }) => {
  const { coverLetter } = data
  return (
    <div className="flex flex-col p-4">
      <p>{coverLetter}</p>
    </div>
  )
}

export default ProposalCard
