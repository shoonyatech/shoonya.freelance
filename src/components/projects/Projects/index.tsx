import React from 'react'

import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ManageProject from '../../manageProject/ManageProject'
import ProjectList from '../ProjectList'

const Projects = ({ data, activeProjectId, updateActiveProjectId, projectData }) => (
  <MasterDetailsLayout>
    <ProjectList activeProjectId={activeProjectId} updateActiveProjectId={updateActiveProjectId} data={data} />
    <ManageProject data={projectData} isReadOnly />
  </MasterDetailsLayout>
)

export default Projects
