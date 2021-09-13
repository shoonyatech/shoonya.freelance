/* eslint-disable jsx-a11y/anchor-is-valid */
import { AppBar, Button } from '@material-ui/core'
// import Link from 'next/link'
import React from 'react'

import Sidebars from '../Drawer'

const Header = () => (
  <AppBar position="static">
    <div className="bg-secondary pl-10 p-2 flex justify-between">
      {/* <Link href="/" passHref>
        <a>
          <h1 className="text-primary">Shoonya</h1>
        </a>
      </Link> */}
      <div className="block cursor-pointer">
        <Sidebars />
      </div>
      <div className="m-2">
        <Button variant="contained" color="primary" className="block" href="/api/auth/login">
          Sign in
        </Button>
      </div>
    </div>
  </AppBar>
)

export default Header
