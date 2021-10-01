/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import React from 'react'

const DashboardCard = ({ children, route }: any) => (
  <Link href={route}>
    <a className="border-2 border-solid border-primary p-4 lg:p-8 my-4 lg:my-8 text-lg lg:text-2xl">{children}</a>
  </Link>
)

export default DashboardCard
