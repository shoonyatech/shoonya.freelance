/* eslint-disable react/react-in-jsx-scope */
import { useRouter } from 'next/router'

function Route({ children, href, func }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    func()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  )
}

export default Route
