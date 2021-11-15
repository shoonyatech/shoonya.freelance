import React from 'react'

const ProposalCard = ({ coverLetter, budget }) => (
  <div className="flex flex-col border-solid border-2 border-primary m-4 p-4">
    <p>{coverLetter}</p>
    <p>Budget : {budget}</p>
  </div>
)

export default ProposalCard
