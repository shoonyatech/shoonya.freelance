/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  makeStyles,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core'
import { Menu, Search } from '@material-ui/icons'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import React, { useState } from 'react'

import DrawerButtons from './drawer'

const useStyle = makeStyles((theme) => ({
  header: {
    height: 92,
    width: '100%',
    justifyContent: 'space-evenly',
    display: 'flex',
    color: 'black',
  },
  logo: {
    color: '#002BF5',
    fontWeight: 900,
    fontSize: '22px',
    textTransform: 'uppercase',
  },
  logo1: {
    background: '#002BF5',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'inline',
  },
  categories: {
    width: 94,
    height: 17,
    fontWeight: 500,
    fontSize: 14,
    color: '#0468DB',
    // marginLeft: '60px'
  },
  component: {
    background: '#FFFFFF',
    marginBottom: '20px',
  },
  logoHead: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-220px',
    },
  },
  categoriesHead: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  product: {
    width: '99px',
    height: '40px',
    backgroundColor: '#B6C3D3',
    fontSize: 12,
    borderRadius: '12px 0px 0px 12px',
  },
  field: {
    width: 350,
    height: 40,
    border: '1px solid #0468DB',
  },
  input: {
    marginLeft: '15px',
    fontSize: '12px',
  },
  search: {
    width: '99px',
    height: '40px',
    borderRadius: '0px 12px 11px 0px',
    backgroundColor: '#0468DB',
    fontSize: 12,
    color: '#FFFFFF',
  },
  request: {
    width: '140px',
    height: '40px',
    color: '#0468DB',
    fontSize: 12,
  },
  searchComponent: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  searchIcon: {
    fontSize: '16px',
    color: '#FFFFFF',
    marginLeft: '5px',
  },
  requestButton: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #0468DB',
    borderRadius: '10px',
    marginLeft: '60px',
  },
  button1: {
    fontSize: 14,
    height: 15,
    width: 32,
    color: '#818898',
    marginLeft: '5px',
  },
  button2: {
    fontSize: 14,
    height: 15,
    width: 32,
    color: '#818898',
    marginLeft: '5px',
  },
  buttonComponent: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      right: 12,
      marginTop: '26px',
    },
  },
  button: {
    marginLeft: '30px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginLeft: '-20px',
    },
  },
}))

const ToolBar = withStyles({
  root: {
    minHeight: 55,
  },
})(Toolbar)

function Header() {
  const classes = useStyle()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const list = () => (
    <Box onClick={handleClose}>
      <List>
        <ListItem button>
          <DrawerButtons />
        </ListItem>
      </List>
    </Box>
  )
  return (
    <AppBar className={classes.component} position="fixed">
      <ToolBar>
        <IconButton className={classes.drawer} style={{ color: '#676E7E' }} color="inherit" onClick={handleOpen}>
          <Menu />
        </IconButton>
        <Drawer open={open} onClose={handleClose}>
          {list()}
        </Drawer>
        <div className={classes.header}>
          <Box className={classes.logoHead}>
            <div className={classes.logo1}></div>
            <Typography className={classes.logo}>Tradyl</Typography>
          </Box>
          <Box className={classes.categoriesHead}>
            <Typography className={classes.categories}>
              Categories
              <ExpandMore />
            </Typography>
          </Box>
          <div className={classes.searchComponent}>
            <Button className={classes.product} variant="contained">
              Product
              <ExpandMore />
            </Button>
            <InputBase
              className={classes.field}
              inputProps={{ className: classes.input }}
              placeholder="Search for products"
            />
            <Button className={classes.search}>
              Search
              <Search className={classes.searchIcon} />
            </Button>
            <div className={classes.requestButton}>
              <Button className={classes.request}>Request for quote</Button>
            </div>
          </div>
          <Box className={classes.buttonComponent}>
            <Button>
              <PersonIcon />
              <Typography className={classes.button1}>Login</Typography>
            </Button>
            <Button className={classes.button}>
              <FavoriteBorderIcon />
              <Typography className={classes.button2}>Saved</Typography>
            </Button>
            <Button className={classes.button}>
              <Badge badgeContent={3} color="success">
                <ShoppingCartIcon />
              </Badge>
              <Typography className={classes.button2}>Cart</Typography>
            </Button>
          </Box>
        </div>
      </ToolBar>
    </AppBar>
  )
}

export default Header
