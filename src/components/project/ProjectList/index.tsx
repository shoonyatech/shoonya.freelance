/* eslint-disable no-underscore-dangle */
import React from 'react'

const ProjectList = ({ data, updateActiveProposalId, activeProjectId }: any) => (
  <div className="flex flex-col overflow-y-auto max-h-screen">
    {data.map((proposal: any) => (
      <button
        key={proposal._id}
        onClick={() => updateActiveProposalId(proposal._id)}
        type="button"
        className={`flex flex-col border-2 border-solid m-4 p-4 ${
          proposal._id === activeProjectId ? 'border-4 ' : ' border-2'
        }`}
      >
        <div className="text-xl font-bold">{proposal?.title}</div>
        <div className="self-end">{proposal?.budget} </div>
      </button>
    ))}
  </div>
)
export default ProjectList
