'use client'

import { Chevronown, CircleOff, Cloud, CopyPlusIcon, CpuIcon, Github, Laptop, Lock, Moon, Palette, Sparkles, Sun } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

import { LANGUAGE_CONFIG, THEMES, THEME_DEFINITONS } from '../_constants';
import Image from 'next/image';
import { useCodeEditorState } from '@/store/useCodeEditorStore';
import useMounted from '@/hooks/useMounted';

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};


const ThemeSelector = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useCodeEditorState();
  const mounted = useMounted();


  const currentTheme = THEMES.find(t => t.id == theme );

  useEffect(() => {
    const handleClickOutside = (e: Event ) => {
      if ( dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('mousedown',  handleClickOutside);

    return ()=>{
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleThemeSelect = (id : string )=>{
    setTheme(id);
    setIsOpen(false);
  };

  if ( !mounted ) return null;

  return (
   <div className='relative' ref={dropdownRef}>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={ () => setIsOpen(!isOpen) }
        className='flex justify-between items-center gap-1 md:gap-2 border-gray-500 border bg-[#1e1e2e]/80 hover:bg-[#262637] px-1 pe-2 md:px-2 py-1 rounded-lg md:min-w-[180px] overflow-hidden'>
        {/* hover state bg decorator */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className='relative size-8 rounded-lg px-1.5 group-hover:scale-110 transition-transform flex justify-center items-center'>
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg 
              opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
              />
            <Palette className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
         </div>

        <p className='hidden md:block text-gray-300 min-w-[80px] text-left group-hover:text-white transition-colors text-no-wrap'>
          { currentTheme ? currentTheme.label : "Language"}
        </p>

        <div className='w-4 h-4 rounded-full ring-1' style={{backgroundColor: currentTheme?.color}}></div>
      </motion.button>

      <AnimatePresence>
        { isOpen && 
          <motion.div
            initial={{ 
              opacity: 0, 
              y: 8, 
              scale: 0.96 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1 
            }}
            exit={{ 
              opacity: 0,    
              y: 8, 
              scale: 0.96 
            }}
            transition={{ duration: 0.3 }}
            className="absolute top-full right-1 mt-2 w-full min-w-[240px] bg-[#1e1e2e]/95 
            backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50 max-h-96 overflow-y-scroll"
          >
            <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 px-2 mt-3"> Select Language</p>
            </div>

            { THEMES.map((t, index) => {
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group px-2"
                  >
                    <button
                      className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#262637]
                      ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                    `}
                      onClick={ () => handleThemeSelect(t.id)}
                    >
                      {/* decorator */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity"
                      />

                      <div
                        className={`
                         relative size-8 rounded-lg p-1.5 group-hover:scale-110 transition-transform
                         ${theme === t.id ? "bg-blue-500/10" : "bg-gray-800/50"}
                       `}
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        
                        { THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" /> }
                       
                      </div>

                      <span className="flex-1 text-left group-hover:text-white transition-colors">
                        {t.label}
                      </span>

                      {/* color indicator */}
                      <div
                        className="relative size-4 rounded-full border border-gray-600 
                      group-hover:border-gray-500 transition-colors"
                        style={{ background: t.color }}
                      />

                      {/* active theme border */}
                      {theme === t.id && (
                        <motion.div
                          className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                          transition={{ 
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6 
                          }}
                        />
                      )}
                    </button>
                  </motion.div>
                );
              }) }
          </motion.div>
        }
        </AnimatePresence>
    </div>
  )
}

export default ThemeSelector;