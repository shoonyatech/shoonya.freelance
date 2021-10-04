import React from 'react'

const range = {
  low: '$',
  medium: '$$',
  high: '$$$',
}

const ProjectList = ({ data, setActiveId }: any) => (
  <div className="flex flex-col">
    {data.map((listItem: any) => (
      <button
        onClick={() => setActiveId(listItem.id)}
        type="button"
        className="flex flex-col border-2 border-solid border-primary m-4 p-4"
      >
        <div className="text-xl font-bold">{listItem.name}</div>
        <div>{listItem.description}</div>
        <div className="self-end">{range[listItem.priceRange]} </div>
      </button>
    ))}
  </div>
)
export default ProjectList
