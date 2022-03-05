import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import React from 'react'

import Bottom from '../Bottom'
import Loader from '../Loader'
import Top from '../Top'

function Layout({ children }: any): React.ReactElement {
  const { user, isLoading, error } = useUser()

  if (isLoading || error)
    return (
      <div>
        <Loader open={isLoading} error={error} />
      </div>
    )

  return (
    <>
      <Head>
        <title>Shoonya</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="application-name" content="shoonya freelance" />
        <meta name="apple-mobile-web-app-title" content="shoonya freelance" />

        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%26display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <div className={`min-w-full min-h-screen grid overflow-x-hidden ${!user ? 'sm:grid-rows-pancake' : ''}`}>
        <Top user={user} />
        <main className={`p-2 sm:p-4 lg:p-6 xl:p-8 ${user ? 'ml-16' : ''}`}> {children} </main>
        <Bottom user={user} />
      </div>
    </>
  )
}

export default Layout
