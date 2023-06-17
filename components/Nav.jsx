"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname } from 'next/navigation'

const Nav = () => {
  const { data: session } = useSession();
  const pathname = usePathname()
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (

    <nav className='flex-between w-full mb-16 pt-3 item-center'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>
          NextBlog
        </p>
      </Link>
      {/* <nav className=""> */}
      <div className="container flex items-center justify-center p-6 mx-auto text-black capitalize dark:text-gray-300">
        <a href="/blog" className={pathname === '/blog' ? "text-black  border-b-2 primary-orange mx-1.5 sm:mx-6" : "text-black    mx-1.5 sm:mx-6"} >
          Blogs</a>
        <a href="/NewsFeeds" className={pathname === '/NewsFeeds' ? "text-black  border-b-2 primary-orange mx-1.5 sm:mx-6" : "text-black    mx-1.5 sm:mx-6"} >
          NewsFeeds</a>
        <a href="/Events" className={pathname === '/Events' ? "text-black  border-b-2 primary-orange mx-1.5 sm:mx-6" : "text-black    mx-1.5 sm:mx-6"} >
          Events
        </a>



      </div>
      {/* </nav> */}
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            {
              (pathname === '/blog') ?

                <Link href={`/create-blog`} className='black_btn text-lg w-44'>
                  Create Blog
                </Link>
                : ""

            }
            {
              (pathname === '/NewsFeeds') ?

                <Link href={`/create-${pathname.substring(1)}`} className='black_btn w-44'>
                  Create News
                </Link>
                : ""

            }
            {
              (pathname === '/Events') ?

                <Link href={`/create-event`} className='black_btn w-44'>
                  New event
                </Link>
                : ""

            }
            {/* <Link href={`/create-${pathname.substring(1)}`} className='black_btn w-44'>
              Create {pathname.substring(1)}
            </Link> */}

            <button type='button' onClick={signOut} className='outline_btn w-36'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={70}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                {/* <Link
                  href='/create-prompt'
                  className='dropdown_link'
               
                >
                  Create Prompt
                </Link> */}
                {
                  (pathname === '/blog') ?

                    <Link href={`/create-blog`} onClick={() => setToggleDropdown(false)} className=' dropdown_link '>
                      Create Blog
                    </Link>
                    : ""

                }
                {
                  (pathname === '/NewsFeeds') ?

                    <Link href={`/create-${pathname.substring(1)}`} onClick={() => setToggleDropdown(false)} className=' dropdown_link'>
                      Create News
                    </Link>
                    : ""

                }
                {
                  (pathname === '/Events') ?

                    <Link href={`/create-event`} onClick={() => setToggleDropdown(false)} className=' dropdown_link'>
                      New event
                    </Link>
                    : ""

                }
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 h-3 w-full  black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav >
  );
};

export default Nav;
