import React from 'react'

import ProjectTitle from '../ProjectTitle'

const ProjectHeading = ({ data, userId }) => (
  <div className="lg:grid lg:grid-cols-profile">
    <ProjectTitle data={data.title} projectId={data._id} userId={userId} />
  </div>
)

export default ProjectHeading
