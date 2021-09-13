/* eslint-disable jsx-a11y/anchor-is-valid */
import { AppBar, Box, Drawer, IconButton, List, ListItem, makeStyles, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import React, { useState } from 'react'

import Buttons from './buttons'

const useStyle = makeStyles({
  list: {
    width: 240,
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
})

function Sidebar() {
  const classes = useStyle()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const ButtonList = () => (
    <Box className={classes.list}>
      <List>
        <ListItem>
          <Buttons />
        </ListItem>
      </List>
    </Box>
  )
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <div>
          <IconButton aria-label="menu" onClick={handleOpen}>
            <MenuIcon style={{ display: 'flex' }} />
          </IconButton>
          <Link href="/" passHref>
            <img
              src="./images/wallora-logo-170x53.jpeg"
              alt="Wallora logo"
              className="block cursor-pointer"
            />
          </Link>
        </div>
        <Drawer open={open} onClose={handleClose}>
          <ButtonList />
        </Drawer>
      </Toolbar>
    </AppBar>
  )
}

export default Sidebar
