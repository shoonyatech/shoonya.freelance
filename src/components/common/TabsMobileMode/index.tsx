/* eslint-disable react/jsx-props-no-spreading */
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { makeStyles, Theme } from '@material-ui/core/styles'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import DescriptionIcon from '@material-ui/icons/Description'
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import Link from 'next/link'
import React, { useState } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '@media (min-width:640px)': { display: 'none' },
    background: theme.palette.primary.main,
  },
  wrapper: {
    color: '#fff',
  },
}))

export default function ScrollableTabsButtonForce() {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation
      value={value}
      // todo: add component='nav' ,gives ts error
      className={classes.root}
      onChange={handleChange}
    >
      <Link href="/dashboard" passHref>
        <BottomNavigationAction
          className={classes.wrapper}
          showLabel
          value="Dashboard"
          label="Dashboard"
          icon={<HomeIcon />}
        />
      </Link>

      <Link href="/projects" passHref>
        <BottomNavigationAction
          className={classes.wrapper}
          showLabel
          value="Projects"
          label="Projects"
          icon={<DescriptionIcon />}
        />
      </Link>
      <Link href="/freelancers" passHref>
        <BottomNavigationAction
          className={classes.wrapper}
          showLabel
          label="Freelancers"
          value="Freelancers"
          icon={<BusinessCenterIcon />}
        />
      </Link>
      <Link href="/" passHref>
        <BottomNavigationAction
          className={classes.wrapper}
          showLabel
          value="Settings"
          label="Settings"
          icon={<SettingsIcon />}
        />
      </Link>
      <Link href="/api/auth/logout" passHref>
        <BottomNavigationAction
          className={classes.wrapper}
          showLabel
          value="Sign out"
          label="Sign out"
          icon={<ExitToAppSharpIcon />}
        />
      </Link>
    </BottomNavigation>
  )
}
