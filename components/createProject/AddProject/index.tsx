/* eslint-disable arrow-body-style */
import React from 'react'

import ProjectMain from '../ProjectMain'
import ProjectSideBar from '../ProjectSideBar'

const AddProject = () => {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
        <ProjectSideBar />
        <ProjectMain />
      </div>
    </div>
  )
}

export default AddProject
