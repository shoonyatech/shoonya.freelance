/* eslint-disable arrow-body-style */
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import React, { useState } from 'react'

import { icons } from '../../../lib/icon'
import SearchBar from '../SearchBar'

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

interface Props {
  techStack: any
  handleSkillChange: any
  isIconName?: boolean
}

const defaultProps = {
  isIconName: false,
}

const SkillIcons = ({ techStack, handleSkillChange, isIconName }: Props) => {
  const classes = useStyles()

  const [showTechStackIconPickor, setShowTechStackIconPickor] = useState<boolean>(false)
  const iconsArr = Object.keys(icons)
  const [filteredArr, setFilteredArr] = useState(iconsArr)

  const openTechStackPickor = () => {
    setShowTechStackIconPickor(true)
  }

  const closeTechStackPickor = () => {
    setShowTechStackIconPickor(false)
  }

  const onSelectedSkillChange = (icon: any) => {
    const updateTechStack = techStack.includes(icon) ? techStack.filter((b) => b !== icon) : [...techStack, icon]
    handleSkillChange(updateTechStack)
  }

  const handleFilterIcons = (icon) => {
    setFilteredArr(icon)
  }

  return (
    <div className="pb-4 relative h-10">
      <div className="flex items-center">
        <div className="flex items-center">
          <p className="mr-2 whitespace-nowrap">Tech stack : </p>
          <ul className="flex flex-wrap">
            {techStack.map((icon) => {
              if (isIconName) {
                return (
                  <li key={icon} className="px-0.5">
                    <Chip icon={icons[`${icon}`]} label={icon} color="primary" variant="outlined" />
                  </li>
                )
              }
              return (
                <li key={icon} className="px-0.5">
                  {icons[`${icon}`]}
                </li>
              )
            })}
          </ul>
        </div>
        <Button onClick={() => openTechStackPickor()}>
          <AddIcon />
        </Button>
        {showTechStackIconPickor ? (
          <div className="flex flex-col max-h-80 overflow-y-auto w-96 max-w-full bg-white shadow-lg rounded absolute top-10 z-20">
            <IconButton onClick={() => closeTechStackPickor()} className={classes.btn}>
              <CancelIcon />
            </IconButton>
            <SearchBar list={iconsArr} label="search icons" handleFilter={handleFilterIcons} />
            <ul className="flex flex-wrap p-2">
              {filteredArr.map((icon) => {
                if (isIconName) {
                  return (
                    <li key={icon} className="p-1 list-none">
                      <Chip
                        onClick={() => onSelectedSkillChange(icon)}
                        icon={icons[`${icon}`]}
                        label={icon}
                        color="primary"
                        // variant={`${techStack.includes(icon) ? 'default' : 'outlined'}`}
                      />
                    </li>
                  )
                }
                return (
                  <li key={icon} className="px-0.5 list-none">
                    <Button
                      onClick={() => onSelectedSkillChange(icon)}
                      className={`iconbtn ${techStack.includes(icon) && classes.active}`}
                    >
                      {icons[icon]}
                    </Button>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default SkillIcons

SkillIcons.defaultProps = defaultProps
