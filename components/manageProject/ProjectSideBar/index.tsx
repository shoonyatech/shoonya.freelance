import React from 'react'

import ProjectBudget from '../ProjectBudget'
import ProjectScope from '../ProjectScope'

const ProjectSideBar = ({ data }) => (
  <div className="bg-resume py-4">
    <ProjectScope data={data.scope} />
    <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
    <ProjectBudget data={data.budget} />
  </div>
)

export default ProjectSideBar
