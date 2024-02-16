import React from 'react'
import {Button, Navbar,TextInput} from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

function Header() {
  const path =  useLocation().pathname ;
  return (
  <Navbar className='border-b-2'>
    <Link to='/' 
    className='self-center witespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Karim</span>
      Blog
    </Link>
    <form >
      <TextInput
      type='text'
      placeholder='Search...'
      rightIcon={AiOutlineSearch}
      className='hidden lg:inline'
      />

    </form>
    <Button className='w-12 h-10 lg:hidden ' color='gray' pill> 
      <AiOutlineSearch/>
    </Button>

    <div className="flex gap-2 md:order-2">
      <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
        <FaMoon/>
      </Button>
      <Link to='/signup'>
      <Button  gradientDuoTone='purpleToBlue' outline>
        Sign Up
        </Button>
      </Link>
      <Navbar.Toggle />
    </div>
      <Navbar.Collapse >

        <Navbar.Link   as={Link}  to='/'active={path === '/'} >
          <Link  to='/'>
            Home
          </Link>
          </Navbar.Link>

          <Navbar.Link   as={Link}   to='/about' active={path === '/about'} >
          <Link  to='/about'>
            About
          </Link>
          </Navbar.Link>

          <Navbar.Link   as={Link}  to='/projects' active={path === '/projects'}>
          <Link to='/projects'>
           Projects
          </Link>
        </Navbar.Link>

      </Navbar.Collapse>
  </Navbar>
  )
}

export default Header