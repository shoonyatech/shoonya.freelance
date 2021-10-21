/* eslint-disable arrow-body-style */
import React from 'react'

import ProjectMain from '../ProjectMain'
import ProjectSideBar from '../ProjectSideBar'

const ManageProject = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-profile   lg:min-h-screen ">
        <ProjectSideBar data={data} />
        <ProjectMain data={data} />
      </div>
    </div>
  )
}

export default ManageProject
