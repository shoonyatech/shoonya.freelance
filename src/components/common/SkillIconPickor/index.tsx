import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import React, { useState } from 'react'

import { icons, iconsList } from '../../../lib/icon'
import SearchBar from '../SearchBar'

interface Props {
  displayIcon?: boolean
  isActive: boolean
  closeIconPickor: any
  selectedIcons: any
  handleSkillChange: any
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

const SkilliconPickor = ({ isActive, displayIcon, closeIconPickor, selectedIcons, handleSkillChange }: Props) => {
  const classes = useStyles()
  const [activeIcons, setactiveIcons] = useState(iconsList)
  const handleSkillsFilter = (filteredIcons) => setactiveIcons(filteredIcons)

  const onSelectedSkillChange = (icon: any) => {
    const updateTechStack = selectedIcons.includes(icon)
      ? selectedIcons.filter((b) => b !== icon)
      : [...selectedIcons, icon]
    handleSkillChange(updateTechStack)
  }
  return (
    <>
      {isActive ? (
        <div className="relative max-h-80 w-96">
          <div className="flex flex-col overflow-y-auto  max-w-full bg-white shadow-lg rounded absolute z-20">
            <div className="flex pb-2">
              <SearchBar list={iconsList} label="search icons" handleFilter={handleSkillsFilter} />
              <IconButton onClick={() => closeIconPickor()} className={classes.btn}>
                <CancelIcon />
              </IconButton>
            </div>
            <ul className="flex flex-wrap p-2">
              {activeIcons?.map((icon) => (
                <li key={icon}>
                  <Chip
                    onClick={() => onSelectedSkillChange(icon)}
                    className={`${classes.iconbtn} ${selectedIcons.includes(icon) && classes.active}`}
                    icon={displayIcon ? icons[`${icon}`] : undefined}
                    label={icon}
                    color="primary"
                    variant={selectedIcons.includes(icon) ? 'default' : 'outlined'}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  )
}
export default SkilliconPickor

SkilliconPickor.defaultProps = defaultProps
