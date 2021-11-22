import React from 'react'

const ProposalCard = ({ data }) => {
  const { coverLetter } = data
  return (
    <button type="button" className="flex flex-col border-solid border-2 border-primary m-4 p-4">
      <p>{coverLetter}</p>
    </button>
  )
}

export default ProposalCard
