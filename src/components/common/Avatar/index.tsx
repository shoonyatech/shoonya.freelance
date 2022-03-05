import { Image } from 'cloudinary-react'
import React, { FC } from 'react'
import { CgProfile } from 'react-icons/cg'

type Props = {
  src: URL | null
  tailwindSizeClass: string
}

const Avatar: FC<Props> = ({ src, tailwindSizeClass }) => (
  <div
    className={`text-gray-700 dark:text-gray-200 relative ${tailwindSizeClass} rounded-full flex flex-col items-center justify-center bg-white dark:bg-brand-grey-800 dark:border-brand-grey-800 shadow tracking-wide uppercase border cursor-pointer`}
  >
    {src ? <Image cloudName="dbbunxz2o" className="rounded-full" publicId={src} /> : <CgProfile size="100%" />}
  </div>
)

export default Avatar
