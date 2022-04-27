import TextField from '@mui/material/TextField'
import React from 'react'

const SearchBar = ({ list, label, handleFilter }: { list: any; label: string; handleFilter: any }) => {
  const handleOnKeyUp = (e) => {
    const filter = list.filter((str) => str.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    handleFilter(filter)
  }

  return <TextField id="standard-basic" label={label} onKeyUp={handleOnKeyUp} fullWidth sx={{ margin: '0 0.5em' }} />
}

export default SearchBar
