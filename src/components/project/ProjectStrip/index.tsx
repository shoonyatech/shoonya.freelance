/* eslint-disable jsx-a11y/anchor-is-valid */
import Chip from '@mui/material/Chip'
import Link from 'next/link'
import React from 'react'

import { icons } from '../../../lib/icon'

const ProjectStrip = ({ data: { title, skills, budgetLevel }, href }) => (
  <Link href={href}>
    <a className="flex flex-col p-4 my-4 border-2 border-gray-200 border-solid rounded-lg">
      <div className="h-16 text-xl font-medium">{title}</div>
      <div className="flex justify-between w-full">
        <div>
          {skills?.map((skill) => (
            <Chip sx={{ background: '#E5E7EB' }} key={skill} label={skill} icon={icons[`${skill}`]} />
          ))}
        </div>
        <p className="text-lg text-gray-400">{budgetLevel}</p>
      </div>
    </a>
  </Link>
)
export default ProjectStrip
