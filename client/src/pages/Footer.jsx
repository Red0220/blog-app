import React from 'react'
import {Footer} from 'flowbite-react';
import {Link} from 'react-router-dom';
import {BsFacebook} from 'react-icons/bs'
import {FaInstagram, FaTelegram, FaGithub} from 'react-icons/fa'

function FooterComponent() {
  return (
   <Footer className='border border-t-8 border-teal-500'>
    <div className="w-full max-w-7xl mx-auto ">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
            <Link to='/' 
            className='self-center witespace-nowrap text-lg sm:text-xl 
            font-semibold dark:text-white'>
           <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Karim</span>
          Blog
           </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                <Footer.Title title='About'/>
                <Footer.LinkGroup col >
                    <Footer.Link href='#'>
                        100 js project
                    </Footer.Link>
                    <Footer.Link href='#'>
                        Karim blog
                    </Footer.Link>
                </Footer.LinkGroup>

                </div>
                <div>
                <Footer.Title title='Folow us'/>
                <Footer.LinkGroup col >
                    <Footer.Link href='https://github.com/Red0220?tab=repositories'>
                      GitHube
                    </Footer.Link>
                    <Footer.Link href='#'>
                       Telegram
                    </Footer.Link>
                </Footer.LinkGroup>

                </div>
                <div>
                <Footer.Title title='LEGAL'/>
                <Footer.LinkGroup col >
                    <Footer.Link href='#'>
                     Privacy Policy
                    </Footer.Link>
                    <Footer.Link href='#'>
                       Terms &amp; Conditions
                    </Footer.Link>
                </Footer.LinkGroup>

                </div>
            </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:pb-4 sm:flex sm:justify-between">
            <Footer.Copyright href='#' by="karimBlog" year={ new Date().getFullYear()}/>
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href='#' icon={BsFacebook}/>
                <Footer.Icon href='#' icon={FaTelegram}/>
                <Footer.Icon href='#' icon={FaGithub}/>
                <Footer.Icon href='#' icon={FaInstagram}/>
            </div>
        </div>
    </div>
    </Footer>
  )
}

export default FooterComponent