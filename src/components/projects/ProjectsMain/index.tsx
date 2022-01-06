/* eslint-disable no-underscore-dangle */
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import React from 'react'

import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import ProjectFullDescription from '../ProjectFullDescription'
import ProjectList from '../ProjectList'

const ProjectsMain = ({ data, activeProjectId, updateActiveProjectId, projectData, toggleSlider }) => (
  <MasterDetailsLayout>
    <ProjectList activeProjectId={activeProjectId} updateActiveProjectId={updateActiveProjectId} data={data} />
    <div className="my-4 px-6 py-2">
      <div className="flex gap-4 mb-4">
        <Button onClick={() => toggleSlider()} variant="contained" color="primary">
          Apply
        </Button>
        <Link href={`/projects/${projectData._id}`} passHref>
          <Button variant="contained" color="primary">
            Details
          </Button>
        </Link>
      </div>
      <ProjectFullDescription data={projectData} />
    </div>
  </MasterDetailsLayout>
)

export default ProjectsMain
