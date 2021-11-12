import React from 'react'

import Avatar from '../Avatar'
import UserNameTitle from '../UserNameTitle'

const Heading = ({ data }) => {
  const userNametitle = {
    name: data.name,
    title: data.title,
  }
  return (
    <div className="lg:grid lg:grid-cols-profile">
      <UserNameTitle data={userNametitle} />
      <Avatar data={data.picture} />
    </div>
  )
}
export default Heading
