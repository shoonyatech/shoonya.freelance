/* eslint-disable no-underscore-dangle */
import React from 'react'

import ProjectBudget from '../ProjectBudget'
import ProjectScope from '../ProjectScope'

const ProjectSideBar = ({ data, userId }) => (
  <div className="bg-resume py-4">
    <ProjectScope data={data.scope} projectId={data._id} userId={userId} />
    <hr className="h-px border-0 bg-black w-4/5 mx-auto my-6" />
    <ProjectBudget data={data.budget} projectId={data._id} userId={userId} />
  </div>
)

export default ProjectSideBar
