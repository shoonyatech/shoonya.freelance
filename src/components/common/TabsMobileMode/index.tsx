/* eslint-disable react/jsx-props-no-spreading */
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { FaBriefcase } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { IoBarChart } from 'react-icons/io5'
import { RiSettings3Fill } from 'react-icons/ri'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '@media (min-width:640px)': { display: 'none' },
    background: theme.palette.primary.main,
  },
  wrapper: {
    color: '#E8D4B2',
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
          icon={<IoBarChart color="#E8D4B2" />}
        />
      </Link>

      <Link href="/projects" passHref>
        <BottomNavigationAction
          className={classes.wrapper}
          showLabel
          value="Projects"
          label="Projects"
          icon={<FaBriefcase color="#E8D4B2" />}
        />
      </Link>
      <Link href="/freelancers" passHref>
        <BottomNavigationAction
          className={classes.wrapper}
          showLabel
          label="Freelancers"
          value="Freelancers"
          icon={<BsPersonBoundingBox color="E8D4B2" />}
        />
      </Link>
      <Link href="/" passHref>
        <BottomNavigationAction
          className={classes.wrapper}
          showLabel
          value="Settings"
          label="Settings"
          icon={<RiSettings3Fill color="#E8D4B2" />}
        />
      </Link>
      <Link href="/api/auth/logout" passHref>
        <BottomNavigationAction
          className={classes.wrapper}
          showLabel
          value="Sign out"
          label="Sign out"
          icon={<FiLogOut color="#E8D4B2" />}
        />
      </Link>
    </BottomNavigation>
  )
}
