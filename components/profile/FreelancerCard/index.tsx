import React from 'react'

import Data from './data.json'

function FreelancerCard() {
  return (
    <div>
      <div className="flex p-3">
        <div>
          <img className="h-20 w-20 rounded-full" src={Data[0].image} alt="Display Pic" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-bold mb-2">{Data[0].name}</p>
          <p className="text-sm mb-2">{Data[0].skills.toString()}</p>
          <p className="text-sm">{Data[0].experience} year exp</p>
        </div>
        <div className="flex absolute right-5">
          <p className="text-sm">{Data[0].currency}</p>
          <p className="text-sm" style={{ marginLeft: 2 }}>
            {Data[0].rate}/hr
          </p>
        </div>
      </div>
    </div>
  )
}

export default FreelancerCard
