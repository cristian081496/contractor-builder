import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="py-5 bg-stone-300">
      <div className="container">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header