'use client';

import { Editor } from '@monaco-editor/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { defineMonacoThemes, LANGUAGE_CONFIG } from '../_constants';
import { RotateCcwIcon, TypeIcon } from 'lucide-react';
import {motion} from 'framer-motion';
import ShareSnippetDialog from './ShareSnippetDialog';
import { useCodeEditorState } from '@/store/useCodeEditorStore';
import useMounted from '@/hooks/useMounted';
import { EditorPanelSkeleton } from './EditorPanelSkeleton';
import RunButton from './RunButton';

const EditorPanel = () => {

  const [ isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { editor, setEditor, fontSize, setFontSize, language, theme } = useCodeEditorState();
  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);


  const handleEditorChange = (value: string | undefined )=>{
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  }

  const handleFontSizeChange = ( e : any )=>{
    const val = parseInt(e.target?.value);
    setFontSize(val);
    localStorage.setItem("editor-font-size", val.toString());
  }

  const handleRefreshCodeHanlder = ()=>{
    const newCode = LANGUAGE_CONFIG['javascript'].defaultCode;
    if (editor) editor.setValue(newCode);
  };

  if ( !mounted ) return <EditorPanelSkeleton />;

  return (
    <div className='relative p-2'>
      <div className='flex justify-between items-center gap-3 items-center bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-3'>
        <div className='flex gap-2 items-center'>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
            <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} />
          </div>
        
          <div className='hidden md:block'>
            <p className='text-md font-semibold text-white-800/80'>Code Editor </p>
            <p className='text-sm font-medium text-blue-400/60'>Write and Execute your code </p>
          </div>
        </div>

        <div className='flex gap-4 jusitfy-center items-center'>
          <div className='flex gap-3 justify-center'>
            <div className='hidden md:flex justify-center items-center gap-1'>
            <TypeIcon width={20} height={20}/>
              <input
                type='range'
                min="10"
                max="26"
                value={fontSize}
                onChange={ handleFontSizeChange }
                className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
              ></input>
              <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                    {fontSize}
                  </span>
              </div>

            <motion.button
              onClick={handleRefreshCodeHanlder}
              >
              <RotateCcwIcon height={20} width={20}/>
            </motion.button>
          </div>

          <RunButton />
          </div>
      </div>

      <div>
          <Editor
              height="550px"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={ handleEditorChange }
              theme={theme}
              value={""}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor) }
              options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
      </div>
      { isShareDialogOpen && <ShareSnippetDialog onClose={()=>setIsShareDialogOpen(false)}/> }
    </div>
  )
}

export default EditorPanel