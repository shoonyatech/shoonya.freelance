/* eslint-disable no-underscore-dangle */
import React from 'react'

import ProjectTitle from '../ProjectTitle'

const ProjectHeading = ({ data }) => (
  <div className="lg:grid lg:grid-cols-profile">
    <ProjectTitle data={data.title} _id={data._id} />
  </div>
)

export default ProjectHeading
