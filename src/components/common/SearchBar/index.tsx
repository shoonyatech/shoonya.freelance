import TextField from '@mui/material/TextField'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    search: {
      margin: '0 0.5em',
    },
  })
)

const SearchBar = ({ list, label, handleFilter }: { list: any; label: string; handleFilter: any }) => {
  const classes = useStyles()
  const handleOnKeyUp = (e) => {
    const filter = list.filter((str) => str.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    handleFilter(filter)
  }

  return <TextField id="standard-basic" label={label} onKeyUp={handleOnKeyUp} fullWidth className={classes.search} />
}

export default SearchBar
