'use client';

import React, { useEffect } from 'react'
import Header from './_components/Header';
import EditorPanel from './_components/EditorPanel';
import OutputPanel from './_components/OutputPanel';
import Footer from './_components/Footer';

const Home = () => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        console.log('CTRL + S');
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <div className='min-h-screen'>
        <div className='max-w-[1800px] mx-auto p-4 flex flex-col gap-2'>
            <Header />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

              <EditorPanel/>
              
              <OutputPanel className='hidden md:block' />
            
            </div>

            <Footer />
        </div>
    </div>
  )
}

export default Home;