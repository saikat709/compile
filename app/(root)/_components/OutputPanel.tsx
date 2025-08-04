'use client';

import { AlertTriangle, CheckCircle, Clock, CopyIcon, Terminal } from 'lucide-react';
import React, { useState } from 'react'
import { getExecutionResult, useCodeEditorState } from '@/store/useCodeEditorStore';
import { OutputPanelSkeleton } from './EditorPanelSkeleton';
import RunningCodeSkeleton from './RunningCodeSkeleton';
import useMounted from '@/hooks/useMounted';

const OutputPanel = ({ className }: { className: string}) => {

  const { error, output, isRunning } = useCodeEditorState();
  const [ hasCopied, setHasCopied ] = useState<boolean>(false);
  const mounted = useMounted();

  const hasContent = error || output || true;

  const handleClick = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText( error || output);
    setHasCopied(true);

    setTimeout(() => setHasCopied(false), 2000);
  };

  if ( !mounted ) return <OutputPanelSkeleton />;
  
  return (
    <div className="relative bg-[#181825] rounded-xl p-2 mt-2 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 p-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>

        { hasContent && (
          <button
            onClick={handleClick}
            className='flex gap-2 items-center'>
            { hasCopied ? <CheckCircle  className='w-3.5 h-3.5'/> : <CopyIcon className='w-3.5 h-3.5'/>  }
            { hasCopied ? "Copied" : "Copy" }
          </button>
        )}
      </div>

      { isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center">Run your code to see the output here...</p>
            </div>
          )
      }
    </div>
  );
}

export default OutputPanel;