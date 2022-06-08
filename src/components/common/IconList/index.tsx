import Chip from '@mui/material/Chip'
import React from 'react'

import { icons } from '../../../lib/icon'
import { isArrayEmpty } from '../../../lib/utils'

interface Props {
  iconArr: any
  displayIcon?: boolean
}

const defaultProps = {
  displayIcon: false,
}

const IconList = ({ iconArr, displayIcon }: Props) => {
  if (isArrayEmpty(iconArr)) return null

  return (
    <div className="flex flex-wrap">
      {iconArr?.map((icon) => (
        <Chip
          label={icon}
          icon={displayIcon ? icons[`${icon}`] : undefined}
          sx={{ margin: '0.25rem 0.5rem ', borderRadius: '1rem' }}
        />
      ))}
    </div>
  )
}
export default IconList

IconList.defaultProps = defaultProps
