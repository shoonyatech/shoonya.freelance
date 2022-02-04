/* eslint-disable jsx-a11y/anchor-is-valid */
import { useUser } from '@auth0/nextjs-auth0'
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { FaBriefcase } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { IoBarChart } from 'react-icons/io5'
import { RiSettings3Fill } from 'react-icons/ri'
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
      backgroundColor: theme.palette.primary.main,
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: theme.palette.primary.main,
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
        <div className="pl-0 pr-0 flex items-center">
          <IconButton onClick={toggleIsOn} color="secondary" aria-label="open drawer" className="w-14 h-14">
            <MenuIcon color="secondary" />
          </IconButton>
          <Link href="/" passHref>
            <a>
              <h1 className="font-bold text-white text-xl md:text-2xl">Shoonya</h1>
            </a>
          </Link>
        </div>

        <Divider />

        <List>
          <Link href="/dashboard" passHref>
            <ListItem button className={classes.list} key="dashboard">
              <ListItemIcon>
                <IoBarChart color="#E8D4B2" size="1.5em" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
        </List>
        <List>
          <Link href="/projects" passHref>
            <ListItem button className={classes.list} key="projects">
              <ListItemIcon>
                <FaBriefcase color="#E8D4B2" size="1.5em" />
              </ListItemIcon>

              <ListItemText primary="Projects" />
            </ListItem>
          </Link>
        </List>
        <List>
          <Link href="/freelancers" passHref>
            <ListItem button className={classes.list} key="freelancers">
              <ListItemIcon>
                <BsPersonBoundingBox color="E8D4B2" size="1.5em" />
              </ListItemIcon>

              <ListItemText primary="Freelancers" />
            </ListItem>
          </Link>
        </List>
        <List style={{ marginTop: `auto` }}>
          <Divider />
          <List>
            <Link href="/me" passHref>
              <ListItem button className={classes.list} key="profile">
                <ListItemIcon>
                  {user?.picture ? (
                    <Image className="rounded-full" src={user?.picture} alt="avatar" height="24" width="24" />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
          </List>

          <Link href="/settings" passHref>
            <ListItem button className={classes.list} key="Settings">
              <ListItemIcon>
                <RiSettings3Fill color="#E8D4B2" size="1.5em" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
          <Link href="/api/auth/logout" passHref>
            <ListItem button className={classes.list} key="Sign out">
              <ListItemIcon>
                <FiLogOut color="#E8D4B2" size="1.5em" />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  )
}
