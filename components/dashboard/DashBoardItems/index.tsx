import React from 'react'

import DashboardCard from '../DashboardCard'

const DashboardItems = () => (
  <div className="w-full max-w-screen-md mx-auto px-4 grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
    <DashboardCard route="/">I want to hire a freelancer</DashboardCard>
    <DashboardCard route="/">I am looking for projects</DashboardCard>
  </div>
)

export default DashboardItems
