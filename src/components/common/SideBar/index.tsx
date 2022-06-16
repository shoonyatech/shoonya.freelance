/* eslint-disable jsx-a11y/anchor-is-valid */
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
    icon: IoBarChart,
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: FaBriefcase,
  },
  {
    name: 'Freelancers',
    href: '/freelancers',
    icon: BsPersonBoundingBox,
  },
]

const secondaryTabs = [
  {
    name: 'Settings',
    href: '/settings',
    icon: RiSettings3Fill,
  },
  {
    name: 'Sign out',
    href: '/api/auth/logout',
    icon: FiLogOut,
  },
]

export default function MiniDrawer() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <header className="sm:fixed sm:block sm:z-10  h-screen hidden  bg-primary text-secondary w-16">
      <div className="mt-4 -right-4 absolute">
        <Image src="/logo.png" alt="logo" width="64" height="64" />
      </div>
      <nav className="h-full">
        <ul className="py-2 h-full flex flex-col justify-between">
          <div className="mt-24">
            {primaryTabs.map((tab) => {
              const isCurrent = router.asPath === tab.href
              return (
                <li key={tab.name} className={`p-2 ${isCurrent && 'bg-secondary text-primary'}`}>
                  <Link href={tab.href}>
                    <a className="flex flex-col items-center" aria-current={isCurrent ? 'page' : undefined}>
                      <tab.icon size="1.25em" color={isCurrent ? '#282828' : '#E8D4B2'} />
                      <span className="text-xs mt-1">{tab.name}</span>{' '}
                    </a>
                  </Link>
                </li>
              )
            })}
          </div>
          <div>
            <li className={`p-2 ${router.asPath === '/me' && 'bg-secondary text-primary'}`}>
              <Link href="/me">
                <a className="flex flex-col items-center">
                  {user?.picture ? (
                    <Image className="rounded-full" src={user?.picture} alt="avatar" height="20" width="20" />
                  ) : null}
                  <span className="text-xs"> Profile</span>
                </a>
              </Link>
            </li>

            {secondaryTabs.map((tab) => {
              const isCurrent = router.asPath === tab.href

              return (
                <li key={tab.name} className={`p-2 ${isCurrent && 'bg-secondary text-primary'}`}>
                  <Link href={tab.href}>
                    <a className="flex flex-col items-center">
                      <tab.icon size="1.25em" color={isCurrent ? '#282828' : '#E8D4B2'} />
                      <span className="text-xs"> {tab.name}</span>
                    </a>
                  </Link>
                </li>
              )
            })}
          </div>
        </ul>
      </nav>
    </header>
  )
}
