import React from 'react'

const ProjectListForProposals = ({ data, updateActiveProject, activeId }: any) => (
  <div className="flex flex-col overflow-y-auto max-h-screen">
    {data.map((proposal: any) => (
      <button
        key={proposal._id}
        onClick={() => updateActiveProject({ projectId: proposal.projectId, proposalId: proposal._id })}
        type="button"
        className={`bg-white flex flex-col border-solid border-gray-200 my-4 p-4 border-2 rounded-lg ${
          proposal._id === activeId && 'shadow-lg'
        }`}
      >
        <p className="text-xl font-bold">{proposal?.projectTitle}</p>
        <p className="self-end">
          {proposal?.currency}
          {proposal?.proposedRate}
        </p>
      </button>
    ))}
  </div>
)
export default ProjectListForProposals
