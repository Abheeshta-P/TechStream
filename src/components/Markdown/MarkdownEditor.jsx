import React, { useState, useEffect, forwardRef, useRef } from 'react';

const MarkdownEditor = forwardRef(({ label, defaultValue = '', name , setValue }, ref) => {
  const [content, setContent] = useState(''); 

  useEffect(() => {
    setContent(defaultValue);
  }, []);

  const handleInput = (e) => {
    const text = e.target.value;
    setContent(text); 
    setValue(name, text); 
  };

  return (
    <div className="w-full h-[300px]">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <div
        className="w-full bg-white text-black h-full border border-gray-200 px-3 py-2 rounded-lg flex"
      >
        <textarea
          ref={ref}
          spellCheck="false"
          className="outline-none w-full h-full bg-transparent resize-none "
          value={content}
          onInput={handleInput}
          placeholder='mark down editor'
        />
      </div>
    </div>
  );
});

export default MarkdownEditor;
