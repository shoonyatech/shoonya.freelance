import React from 'react'

import ProjectTitle from '../ProjectTitle'

const ProjectHeading = ({ data }) => (
  <div className="lg:grid lg:grid-cols-profile">
    <ProjectTitle data={data.title} />
  </div>
)

export default ProjectHeading
