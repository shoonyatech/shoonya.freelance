/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="pl-5 pr-5 pt-2 pb-2 flex justify-between ">
        <span className="mt-auto mb-auto flex flex-col text-secondary">
          <Link href="/terms">
            <a target="_blank">Terms</a>
          </Link>
          <Link href="/privacy">
            <a target="_blank">Privacy Policy</a>
          </Link>
        </span>
      </div>
    </footer>
  )
}
