/* eslint-disable react/jsx-props-no-spreading */

import { AppBar, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import DescriptionIcon from '@material-ui/icons/Description'
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

const useStyles = makeStyles(() => ({
  root: {
    '@media (min-width:640px)': { display: 'none' },
  },
}))

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

export default function ScrollableTabsButtonForce() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <AppBar position="sticky" className={clsx(classes.root)} color="secondary">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
      >
        <Link href="/me" passHref>
          <Tab icon={<HomeIcon />} {...a11yProps(0)} label="" />
        </Link>
        <Link href="/my-proposals" passHref>
          <Tab icon={<DescriptionIcon />} {...a11yProps(3)} label="Settings" />
        </Link>
        <Link href="/my-projects" passHref>
          <Tab icon={<BusinessCenterIcon />} {...a11yProps(0)} label="" />
        </Link>
        <Link href="/settings" passHref>
          <Tab icon={<SettingsIcon />} {...a11yProps(3)} label="Settings" />
        </Link>
        <Link href="/api/auth/logout" passHref>
          <Tab icon={<ExitToAppSharpIcon />} {...a11yProps(4)} label="Sign out" />
        </Link>
      </Tabs>
    </AppBar>
  )
}
