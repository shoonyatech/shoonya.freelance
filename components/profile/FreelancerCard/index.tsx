import React from 'react'

function FreelancerCard({ name, skills, expInYears, hourlyRate, currency, image }) {
  return (
    <>
      <div className="flex p-3 mb-3">
        <div>
          <img className="h-20 w-20 rounded-full" src={image} alt="Display Pic" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-bold mb-2">{name}</p>
          <p className="text-sm mb-2">{skills.toString()}</p>
          <p className="text-sm">{expInYears} year exp</p>
        </div>
        <div className="flex absolute right-5">
          <p className="text-sm">{currency}</p>
          <p className="text-sm ml-1">{hourlyRate}/hr</p>
        </div>
      </div>
    </>
  )
}

export default FreelancerCard
