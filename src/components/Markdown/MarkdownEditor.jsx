import React, { useState, useEffect, forwardRef, useRef } from 'react';
import fetchSuggestion from '../../util/fetchSuggestion';

const MarkdownEditor = forwardRef(({ label, defaultValue = '', name , setValue }, ref) => {
  const [content, setContent] = useState(''); 
  // const [suggestion, setSuggestion] = useState(''); 
  // const debounceTimeoutRef = useRef(null); 

  useEffect(() => {
    setContent(defaultValue);
  }, []);

  const handleInput = (e) => {
    const text = e.target.value;
    setContent(text); 
    setSuggestion(''); 
    setValue(name, text); 

    // clearTimeout(debounceTimeoutRef.current);
    // debounceTimeoutRef.current = setTimeout(async () => {
    //   const suggestion = await fetchSuggestion(text); 
    //   setSuggestion(suggestion); 
    // }, 1500);
  };

  // const handleSuggestion = (e) => {
  //   if (suggestion.trim() !== '') { 
  //     if (e.type === 'keydown' && e.key === 'Tab') { 
  //       e.preventDefault(); 
  //       appendSuggestion();
  //     } else if (e.type === 'click' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) { 
  //       appendSuggestion();
  //     }
  //   }
  // };

  // const appendSuggestion = () => {
  //   const updatedContent = content + " " + suggestion;
  //   setContent(updatedContent); 
  //   setSuggestion(''); 
  //   setValue(name, updatedContent); // Update the form value
  // };

  return (
    <div className="w-full h-[300px]">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <div
        className="w-full bg-white text-black h-full border border-gray-200 px-3 py-2 rounded-lg flex"
        // onClick={handleSuggestion} 
      >
        <textarea
          ref={ref}
          spellCheck="false"
          className="outline-none w-full h-full bg-transparent resize-none "
          value={content}
          onInput={handleInput}
          // onKeyDown={handleSuggestion} 
          placeholder='mark down editor'
        />
        {/* {suggestion && <span className="text-zinc-500">{suggestion}</span>} */}
      </div>
    </div>
  );
});

export default MarkdownEditor;
