import Link from 'next/link';
import React from 'react';
// import Image from 'next/image';
import { Blocks } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
// import HeaderProfileBtn from './HeaderProfileBtn';
// import RunButton from './RunButton';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  return (
    <div className='relative z-10'>

      <div className='flex justify-between items-center bg-[#1a1a1f] items-center p-1 md:p-2 hover:ring-1 ring-white-1 rounded-lg'>
        <div className='p-2 md:p-3 flex gap-4 md:gap-6 items-center'>
          <Link href={'/'} className='flex group justify-start items-center relative gap-3'>

            {/* Hover effect */}
            <div className='absolute -inset-3 bg-gradient-to-r from-red-100/20 to-red-700/20 opacity-0 group-hover:opacity-100 blur-xl rounded-xl transition-all transition-duration-200'></div>

            {/* Icon */}
            <div
              className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
              ring-white/10 group-hover:ring-white/20 transition-all">
              <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>

            {/* Text */}
            <div className='flex flex-col'>
              <p className='text-xl font-bold'>
                <span className=' bg-gradient-to-r from-red-200 to-blue-300 text-transparent bg-clip-text'>
                  Com</span>
                <span className='text-orange-300/90'>Pile</span>
              </p>
              <p className='text-xs text-blue-400/60 font-medium'>Write &nbsp; | &nbsp; Run &nbsp; |&nbsp; Share </p>
            </div>
          </Link>

          {/* <nav className='flex space-x-1'>
            <Link href={'/snippet'} className='relative group flex items-center justify-center gap-2 bg-gray-600/50 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg border border-gray-500 hover:border-blue-600 shadow-lg transition-all transition-duration-200 overflow-hidden'>
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2  className='group-hover:rotate-6 w-4 h-4'/>
              <span className='text-sm font-medium relative z-4 group-hover:text-white transition-colors'>snippet</span>
            </Link>
          </nav> */}
        </div>

        <div className='flex gap-3'>
          <ThemeSelector />
          <LanguageSelector />

          {/* <RunButton /> */}
        </div>

      </div>

    </div>
  )
}

export default Header;