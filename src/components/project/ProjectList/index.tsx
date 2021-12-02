/* eslint-disable no-underscore-dangle */
import React from 'react'

const ProjectList = ({ data, updateActiveProject, activeProjectId }: any) => (
  <div className="flex flex-col overflow-y-auto max-h-screen">
    {data.map((proposal: any) => (
      <button
        key={proposal._id}
        onClick={() => updateActiveProject({ project: proposal.projectId, proposal: proposal._id })}
        type="button"
        className={`flex flex-col border-2 border-solid m-4 p-4 ${
          proposal.projectId === activeProjectId ? 'border-4 ' : ' border-2'
        }`}
      >
        <p className="text-xl font-bold">{proposal?.projectTitle}</p>
        <p className="self-end">{proposal?.propossedRate} </p>
      </button>
    ))}
  </div>
)
export default ProjectList
