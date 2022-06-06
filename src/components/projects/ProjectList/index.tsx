/* eslint-disable no-underscore-dangle */
import Chip from '@mui/material/Chip'
import React from 'react'

import { getBudgetLevel } from '../../../lib/currency'
import { icons } from '../../../lib/icon'

const ProjectsList = ({ data, updateActiveProjectId, activeProjectId }: any) => (
  <div className="flex flex-col overflow-y-auto max-h-screen">
    {data?.map((project: any, i: number) => (
      <button
        key={project._id}
        onClick={() => updateActiveProjectId(project._id, i)}
        type="button"
        className={`bg-white flex flex-col border-solid border-gray-200 my-4 p-4 border-2 rounded-lg ${
          project._id === activeProjectId && 'shadow-lg'
        }`}
      >
        <div className="h-16 text-xl font-bold">{project.title}</div>
        <div className="flex justify-between w-full">
          <div>
            {project.skills.map((skill) => (
              <Chip key={skill} variant="outlined" label={skill} icon={icons[`${skill}`]} />
            ))}
          </div>
          <div>{getBudgetLevel('$', 3, project.budget.amount, 50)}</div>
        </div>
      </button>
    ))}
  </div>
)
export default ProjectsList
