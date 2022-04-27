/* eslint-disable react/jsx-props-no-spreading */
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { FaBriefcase } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { IoBarChart } from 'react-icons/io5'
import { RiSettings3Fill } from 'react-icons/ri'

export default function ScrollableTabsButtonForce() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation
      value={value}
      // todo: add component='nav' ,gives ts error
      sx={{ '@media (min-width:640px)': { display: 'none' }, background: 'primary.main' }}
      onChange={handleChange}
    >
      <Link href="/dashboard" passHref>
        <BottomNavigationAction
          sx={{ background: '#282828', color: '#E8D4B2' }}
          showLabel
          value="Dashboard"
          label="Dashboard"
          icon={<IoBarChart color="#E8D4B2" />}
        />
      </Link>

      <Link href="/projects" passHref>
        <BottomNavigationAction
          sx={{ background: '#282828', color: '#E8D4B2' }}
          showLabel
          value="Projects"
          label="Projects"
          icon={<FaBriefcase color="#E8D4B2" />}
        />
      </Link>
      <Link href="/freelancers" passHref>
        <BottomNavigationAction
          sx={{ background: '#282828', color: '#E8D4B2' }}
          showLabel
          label="Freelancers"
          value="Freelancers"
          icon={<BsPersonBoundingBox color="E8D4B2" />}
        />
      </Link>
      <Link href="/" passHref>
        <BottomNavigationAction
          sx={{ background: '#282828', color: '#E8D4B2' }}
          showLabel
          value="Settings"
          label="Settings"
          icon={<RiSettings3Fill color="#E8D4B2" />}
        />
      </Link>
      <Link href="/api/auth/logout" passHref>
        <BottomNavigationAction
          sx={{ background: '#282828', color: '#E8D4B2' }}
          showLabel
          value="Sign out"
          label="Sign out"
          icon={<FiLogOut color="#E8D4B2" />}
        />
      </Link>
    </BottomNavigation>
  )
}
