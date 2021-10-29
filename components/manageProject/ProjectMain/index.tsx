/* eslint-disable no-underscore-dangle */
import React from 'react'

import ProjectDescription from '../ProjectDescription'
import ProjectSkills from '../ProjectSkills'

const ProjectMain = ({ data }) => (
  <div>
    <ProjectSkills data={data.skills} _id={data._id} />
    <ProjectDescription data={data.description} _id={data._id} />
  </div>
)

export default ProjectMain
