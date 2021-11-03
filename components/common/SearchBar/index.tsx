import React from 'react'

const SearchBar = ({ list, label, handleFilter }) => {
  const handleOnKeyUp = (e) => {
    const filter = list.filter((str) => str.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    handleFilter(filter)
  }

  return (
    <div>
      <input type="text" placeholder={label} onKeyUp={handleOnKeyUp} />
    </div>
  )
}

export default SearchBar
