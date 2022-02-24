import Chip from '@material-ui/core/Chip'
import React from 'react'

import Avatar from '../../common/Avatar'

const FreelancerStrip = ({ freelancer, rate, updateFreelancerIndex, currency, index }) => {
  const { picture, name, title, skills } = freelancer
  return (
    <button type="button" onClick={() => updateFreelancerIndex(index)} className="flex p-3 m-4 border-2 border-solid">
      <div className="flex flex-col items-center">
        <Avatar src={picture} tailwindSizeClass="h-16 w-16" />
        <p>
          {currency}
          {rate}
        </p>
      </div>
      <div className="flex flex-col pl-4">
        <div className="flex-1">
          <p>{name}</p>
          <p className="font-semibold">{title}</p>
        </div>
        <div>
          {skills.map((a) => (
            <Chip label={a.name} />
          ))}
        </div>
      </div>
    </button>
  )
}
export default FreelancerStrip
