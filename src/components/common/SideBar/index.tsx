/* eslint-disable jsx-a11y/anchor-is-valid */
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { FaBriefcase } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { IoBarChart } from 'react-icons/io5'
import { RiSettings3Fill } from 'react-icons/ri'

const primaryTabs = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <IoBarChart color="#E8D4B2" size="1.5em" />,
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: <FaBriefcase color="#E8D4B2" size="1.5em" />,
  },
  {
    name: 'Freelancers',
    href: '/freelancers',
    icon: <BsPersonBoundingBox color="E8D4B2" size="1.5em" />,
  },
]

const secondaryTabs = [
  {
    name: 'Settings',
    href: '/settings',
    icon: <RiSettings3Fill color="#E8D4B2" size="1.5em" />,
  },
  {
    name: 'Sign out',
    href: '/api/auth/logout',
    icon: <FiLogOut color="#E8D4B2" size="1.5em" />,
  },
]

export default function MiniDrawer() {
  const { user } = useUser()

  return (
    <header className="bg-primary text-secondary w-16 h-screen">
      <nav className="h-full">
        <ul className="py-2 h-full flex flex-col justify-between">
          <div>
            {primaryTabs.map((tab) => (
              <li className="p-2">
                <Link href={tab.href}>
                  <a className="flex flex-col items-center">
                    {tab.icon}
                    <span className="text-xs"> {tab.name}</span>{' '}
                  </a>
                </Link>
              </li>
            ))}
          </div>

          <div>
            <li className="p-2">
              <Link href="/me">
                <a className="flex flex-col items-center">
                  {user?.picture ? (
                    <Image className="rounded-full" src={user?.picture} alt="avatar" height="24" width="24" />
                  ) : null}
                  <span className="text-xs"> Profile</span>
                </a>
              </Link>
            </li>
            {secondaryTabs.map((tab) => (
              <li className="p-2">
                <Link href={tab.href}>
                  <a className="flex flex-col items-center">
                    {tab.icon}
                    <span className="text-xs"> {tab.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  )
}
