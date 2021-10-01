import React from 'react'

const List = ({ data }) => {
  const range = {
    low: '$',
    medium: '$$',
    high: '$$$',
  }

  return (
    <div>
      {data.map((listItem: any) => (
        <div className="flex flex-col border-2 border-solid border-primary m-4 p-4">
          <div className="text-xl font-bold">{listItem.name}</div>
          <div>{listItem.description}</div>
          <div className="self-end">{range[listItem.priceRange]} </div>
        </div>
      ))}
    </div>
  )
}
export default List
