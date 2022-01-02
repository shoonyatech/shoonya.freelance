import Chip from '@material-ui/core/Chip'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'

import { icons } from '../../../lib/icon'

interface Props {
  iconArr: any
  displayIcon?: boolean
}

const defaultProps = {
  displayIcon: false,
}

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
    },
    iconbtn: {
      margin: '0.25rem 0.5rem ',
      borderRadius: '1rem',
    },
    active: {
      border: '1px solid',
    },
  })
)

const IconList = ({ iconArr, displayIcon }: Props) => {
  const classes = useStyles()

  return (
    <>
      {iconArr?.map((icon) => (
        <Chip
          label={icon}
          variant="outlined"
          icon={displayIcon ? icons[`${icon}`] : undefined}
          className={`${classes.iconbtn} `}
        />
      ))}
    </>
  )
}
export default IconList

IconList.defaultProps = defaultProps