'use client';

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, CopyPlusIcon, Lock, Sparkles } from 'lucide-react';
import { LANGUAGE_CONFIG } from '../_constants';
import Image from 'next/image';
import { useCodeEditorState } from '@/store/useCodeEditorStore';
import useMounted from '@/hooks/useMounted';

const LanguageSelector = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mounted = useMounted();
  
  const { language, setLanguage } = useCodeEditorState();
  const currentLanguageObj = LANGUAGE_CONFIG[language];

  useEffect(()=>{
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

  const hasAccess = true;
  const handleLanguageSelect = (id : string )=>{
    console.log("Selected Language: ", id);
    setLanguage(id);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
   <div className='relative' ref={dropdownRef}>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={ () => setIsOpen(!isOpen) }
        className='flex justify-center items-center gap-1 md:gap-2 border-gray-500 border bg-[#1e1e2e]/80 hover:bg-[#262637] px-1 md:px-2 py-1 rounded-lg'>
        {/* hover state bg decorator */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className='relative size-8 rounded-lg px-1.5 group-hover:scale-110 transition-transform'>
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg 
              opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
              />
            { currentLanguageObj ? 
              <Image
                width={20}
                height={20}
                src={currentLanguageObj.logoPath}
                alt={`${language} logo`}
                className="w-full h-full object-contain relative z-10"
              />
            : <CopyPlusIcon width={20} height={20} className="w-full h-full size-8 text-gray-400 group-hover:text-gray-300 transition-colors" />
          }
         </div>

        <p className='hidden md:block text-gray-300 min-w-[80px] text-left group-hover:text-white transition-colors'>
          { currentLanguageObj ? currentLanguageObj.label : "Language"}
        </p>

        <ChevronDown  className={`transition-all transition-duration-400 ${isOpen && '-rotate-180'}`}/>
      </motion.button>

      <AnimatePresence>
        { isOpen && 
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.1}}
            className="absolute top-full right-2 mt-2 w-full min-w-[240px] bg-[#1e1e2e]/95
            backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50 max-h-96 overflow-y-scroll"
          >
            <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 px-2 mt-3"> Select Language</p>
            </div>

            { Object.values(LANGUAGE_CONFIG).map((lang, index) => {
                const isLocked = !hasAccess && lang.id !== "javascript";

                return (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group px-2"
                  >
                    <button
                      className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${language === lang.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                      ${isLocked ? "opacity-50" : "hover:bg-[#262637]"}
                    `}
                      onClick={ () => handleLanguageSelect(lang.id)}
                      disabled={isLocked}
                    >
                      {/* decorator */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity"
                      />

                      <div
                        className={`
                         relative size-8 rounded-lg p-1.5 group-hover:scale-110 transition-transform
                         ${language === lang.id ? "bg-blue-500/10" : "bg-gray-800/50"}
                       `}
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <Image
                          width={24}
                          height={24}
                          src={lang.logoPath}
                          alt={`${lang.label} logo`}
                          className="w-full h-full object-contain relative z-10"
                        />
                      </div>

                      <span className="flex-1 text-left group-hover:text-white transition-colors">
                        {lang.label}
                      </span>

                      {/* selected language border */}
                      {language === lang.id && (
                        <motion.div
                          className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}

                      {isLocked ? (
                        <Lock className="w-4 h-4 text-gray-500" />
                      ) : (
                        language === lang.id && (
                          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                        )
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

export default LanguageSelector