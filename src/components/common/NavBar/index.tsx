/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

const NavBar = () => (
  <div className="bg-primary">
    <nav className="p-2 flex items-center justify-between max-w-6xl mx-auto">
      <Link href="/" passHref>
        <a>
          <h1 className="text-secondary text-bold text-xl md:text-2xl">Shoonya</h1>
        </a>
      </Link>
      <div className="m-2">
        <Button variant="contained" color="primary" className="block" href="/api/auth/login">
          Sign in
        </Button>
      </div>
    </nav>
  </div>
)

export default NavBar
