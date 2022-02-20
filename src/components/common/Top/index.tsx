import React from 'react'

import NavBar from '../NavBar'
import SideBar from '../SideBar'

function Top({ user }: any) {
  return <>{user ? <SideBar /> : <NavBar />} </>
}

export default Top
