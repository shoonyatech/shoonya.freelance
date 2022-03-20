/* eslint-disable jsx-a11y/anchor-is-valid */
import Chip from '@mui/material/Chip'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import Link from 'next/link'
import React from 'react'

import { icons } from '../../../lib/icon'

const useStyles = makeStyles(() =>
  createStyles({
    chip: {
      background: '#E5E7EB',
    },
  })
)

const ProjectStrip = ({ data: { title, skills, budgetLevel }, href }) => {
  const classes = useStyles()

  return (
    <Link href={href}>
      <a className="flex flex-col border-solid border-gray-200 my-4 p-4 border-2 rounded-lg">
        <div className="h-16 text-xl font-medium">{title}</div>
        <div className="flex justify-between w-full">
          <div>
            {skills?.map((skill) => (
              <Chip className={classes.chip} key={skill} label={skill} icon={icons[`${skill}`]} />
            ))}
          </div>
          <p className="text-gray-400 text-lg">{budgetLevel}</p>
        </div>
      </a>
    </Link>
  )
}
export default ProjectStrip
