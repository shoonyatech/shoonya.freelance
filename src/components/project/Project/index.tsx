import Chip from '@mui/material/Chip'
import React from 'react'

import { icons } from '../../../lib/icon'

const Project = ({ data }) => (
  <>
    <h2 className="text-2xl font-medium">{data.title}</h2>
    {data.skills.map((skill) => (
      <Chip key={skill} variant="outlined" label={skill} icon={icons[`${skill}`]} />
    ))}
    <div className="flex gap-4 text-gray-600 py-6 ">
      <p className="bg-gray-100 text-center p-2 rounded">
        {data?.budget?.currency}
        {data?.budget?.amount}
        <span className="block text-gray-400 text-lg">{data?.budget?.type}</span>
      </p>
      <p className="bg-gray-100 text-center p-2 rounded">
        Duration
        <span className="block text-gray-400 text-lg">{data?.scope?.duration}</span>
      </p>
    </div>
    <h3 className="text-2xl mb-2">Project Description</h3>
    <p>{data?.description}</p>
  </>
)
export default Project
