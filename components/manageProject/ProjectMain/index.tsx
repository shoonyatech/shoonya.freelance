/* eslint-disable arrow-body-style */
import React from 'react'

import ProjectDescription from '../ProjectDescription'

const ProjectMain = ({ data }) => {
  return (
    <div>
      <ProjectDescription data={data.description} />
    </div>
  )
}

export default ProjectMain
