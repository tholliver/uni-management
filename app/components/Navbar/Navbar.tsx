'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import DarkModeBtn from '../darkmode/DarkModeBtn'
import TableRowsIcon from '@mui/icons-material/TableRows'

const pages = [
  {
    link: '/student',
    name: 'Students',
  },
  {
    link: '/semester',
    name: 'Semester',
  },
  {
    link: '/courses',
    name: 'Courses',
  },
  {
    link: '/careers',
    name: 'Careers',
  },
]

const Navbar = () => {
  const [showMobileMenu, setshowMobileMenu] = useState(false)
  const pathname = usePathname()

  function handleMobileMenu() {
    setshowMobileMenu((pValue) => !pValue)
  }

  return (
    <nav className="border-gray-200 bg-gray-500 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" legacyBehavior>
          <a className="flex items-center">
            <h1 className="flex items-center text-3xl font-extrabold dark:text-white">
              LeVille
              <span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">
                PRO
              </span>
            </h1>
          </a>
        </Link>

        <div className="flex items-center md:order-2">
          {/* <a
            href="#"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Login
          </a>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Sign up
          </a> */}

          <DarkModeBtn />

          <button
            data-collapse-toggle="mega-menu-icons"
            type="button"
            onClick={handleMobileMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mega-menu-icons"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <TableRowsIcon className="dark:text-white text-gray-900" />
          </button>
        </div>

        <div
          className={`${
            showMobileMenu ? 'hidden' : 'block'
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {pages.map((uri, i) => (
              <li key={i}>
                <a
                  href={uri.link}
                  // block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                  className={`block py-2 pl-3 pr-4 ${
                    pathname === uri.link
                      ? ' text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent '
                      : ' text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }  `}
                  aria-current="page"
                  onClick={handleMobileMenu}
                >
                  {uri.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
