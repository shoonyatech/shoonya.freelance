import React from 'react'

import ProjectBudget from '../ProjectBudget'
import ProjectTitle from '../ProjectTitle'

const ProjectSideBar = ({ data }) => (
  <div className="bg-resume py-4">
    <ProjectTitle data={data.title} />
    <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
    <ProjectBudget data={data.budget} />
  </div>
)

export default ProjectSideBar
