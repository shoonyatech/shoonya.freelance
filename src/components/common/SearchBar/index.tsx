import TextField from '@material-ui/core/TextField'
import React from 'react'

const SearchBar = ({ list, label, handleFilter }) => {
  const handleOnKeyUp = (e) => {
    const filter = list.filter((str) => str.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    handleFilter(filter)
  }

  return (
    <div className="px-2">
      <TextField id="standard-basic" label={label} onKeyUp={handleOnKeyUp} fullWidth />
    </div>
  )
}

export default SearchBar
