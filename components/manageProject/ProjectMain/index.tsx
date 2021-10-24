/* eslint-disable arrow-body-style */
import React from 'react'

import ProjectDescription from '../ProjectDescription'
import ProjectSkills from '../ProjectSkills'

const ProjectMain = ({ data }) => {
  return (
    <div>
      <ProjectSkills data={data.skills} />
      <ProjectDescription data={data.description} />
    </div>
  )
}

export default ProjectMain
