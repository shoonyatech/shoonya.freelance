import React from 'react'

const ProposalCard = ({ data, currency, updateActiveProjectId }) => {
  const { projectId, coverLetter, budget } = data
  return (
    <button
      type="button"
      onClick={() => updateActiveProjectId(projectId)}
      className="flex flex-col border-solid border-2 border-primary m-4 p-4"
    >
      <p>{coverLetter}</p>
      <p className="py-2">
        Budget :{currency} {budget}
      </p>
    </button>
  )
}

export default ProposalCard
