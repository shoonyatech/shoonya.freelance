import React from 'react'

import ProjectTitle from '../ProjectTitle'

const ProjectSideBar = ({ data }) => (
  <div className="bg-resume py-4">
    <ProjectTitle data={data.title} />
  </div>
)

export default ProjectSideBar
