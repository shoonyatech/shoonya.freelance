/* eslint-disable no-underscore-dangle */
import Chip from '@material-ui/core/Chip'
import React from 'react'

const range = ['$', '$$', '$$$']

const ProjectsList = ({ data, updateActiveProjectId, activeProjectId }: any) => (
  <div className="flex flex-col overflow-y-auto max-h-screen">
    {data.map((project: any) => (
      <button
        key={project._id}
        onClick={() => updateActiveProjectId(project._id)}
        type="button"
        className={`flex flex-col border-solid border-primary m-4 p-4 ${
          project._id === activeProjectId ? 'border-4 ' : ' border-2'
        }`}
      >
        <div className="text-xl font-bold">{project.title}</div>
        <div>
          {project.skills.map((skill) => (
            <Chip label={skill} />
          ))}
        </div>
        <div className="self-end">{range[Math.floor(Math.random() * range.length)]} </div>
      </button>
    ))}
  </div>
)
export default ProjectsList
