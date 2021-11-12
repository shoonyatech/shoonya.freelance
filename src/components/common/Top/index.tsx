import React from 'react'

import NavBar from '../NavBar'
import SideBar from '../SideBar'

function Top({ user }: any) {
  return <div>{user ? <SideBar /> : <NavBar />}</div>
}

export default Top
