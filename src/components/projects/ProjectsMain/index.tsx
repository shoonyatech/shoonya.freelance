import React from 'react'

import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ProjectFullDescription from '../ProjectFullDescription'
import ProjectList from '../ProjectList'

const ProjectsMain = ({ data, activeProjectId, updateActiveProjectId, projectData, toggleSlider }) => (
  <MasterDetailsLayout>
    <ProjectList activeProjectId={activeProjectId} updateActiveProjectId={updateActiveProjectId} data={data} />
    <ProjectFullDescription data={projectData} toggleSlider={toggleSlider} />
  </MasterDetailsLayout>
)

export default ProjectsMain
