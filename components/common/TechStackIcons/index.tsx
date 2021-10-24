import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import React from 'react'

import { icons } from '../../../lib/icon'

const iconsArr = Object.keys(icons)

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
    },
    iconbtn: {
      margin: '0.5rem',
      borderRadius: '1rem',
    },
    active: {
      border: '1px solid',
    },
  })
)

const TechStackIcons = ({ closeTechStackPickor, techStack, onSelectedSkillChange }) => {
  const classes = useStyles()

  return (
    <div className="flex flex-col max-h-60 w-80 bg-white shadow-lg rounded absolute top-10 z-20">
      <IconButton onClick={() => closeTechStackPickor()} className={classes.btn}>
        <CancelIcon />
      </IconButton>
      <div className="flex flex-wrap p-2">
        {iconsArr.map((icon) => (
          <Button
            onClick={() => onSelectedSkillChange(icon)}
            className={`iconbtn ${techStack.includes(icon) && classes.active}`}
            key={icon}
          >
            {icons[icon]}
          </Button>
        ))}
      </div>
    </div>
  )
}
export default TechStackIcons
