import React from 'react'

import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ManageProject from '../../manageProject/ManageProject'
import ProjectList from '../ProjectList'

const Projects = ({ data, updateActiveProjectId, activeProject }) => (
  <MasterDetailsLayout>
    <ProjectList activeProjectId={activeProject._id} updateActiveProjectId={updateActiveProjectId} data={data} />
    <ManageProject data={activeProject} isReadOnly />
  </MasterDetailsLayout>
)

export default Projects
