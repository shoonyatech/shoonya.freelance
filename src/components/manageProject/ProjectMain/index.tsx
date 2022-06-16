import React from 'react'

import ProjectDescription from '../ProjectDescription'
import ProjectSkills from '../ProjectSkills'

const ProjectMain = ({ data, userId }) => (
  <div>
    <ProjectSkills data={data.skills} projectId={data._id} userId={userId} />
    <ProjectDescription data={data.description} projectId={data._id} userId={userId} />
  </div>
)

export default ProjectMain
