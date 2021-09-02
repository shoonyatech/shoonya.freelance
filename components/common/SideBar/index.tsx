/* eslint-disable jsx-a11y/anchor-is-valid */
import { useUser } from '@auth0/nextjs-auth0'
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useToggle } from 'react-use'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      '@media (max-width:639px)': { display: 'none' },
    },
    drawerOpen: {
      backgroundColor: theme.palette.secondary.main,
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: theme.palette.secondary.main,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
    },
    list: {
      color: '#fff',
    },
  })
)

export default function MiniDrawer() {
  const { user } = useUser()
  const classes = useStyles()
  const [open, toggleIsOn] = useToggle(false)

  return (
    <div className="">
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className="pl-0 pr-0 flex">
          <IconButton onClick={toggleIsOn} color="primary" aria-label="open drawer" className="w-14 h-14">
            <MenuIcon color="primary" />
          </IconButton>
          <Link href="/" passHref>
            <a className="text-white">Shoonya</a>
          </Link>
        </div>

        <Divider />

        <List>
          <Link href="/" passHref>
            <ListItem button className={classes.list} key="home">
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="home" />
            </ListItem>
          </Link>
        </List>
        <List style={{ marginTop: `auto` }}>
          <Divider />
          <List>
            <Link href="/" passHref>
              <ListItem button className={classes.list} key="profile">
                <ListItemIcon>
                  <Image src={user?.picture} alt="avatar" height="28" width="28" />
                </ListItemIcon>
                <ListItemText primary="profile" />
              </ListItem>
            </Link>
          </List>

          <Link href="/settings" passHref>
            <ListItem button className={classes.list} key="Settings">
              <ListItemIcon>
                <SettingsIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
          <Link href="/api/auth/logout" passHref>
            <ListItem button className={classes.list} key="Sign out">
              <ListItemIcon>
                <ExitToAppSharpIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  )
}
