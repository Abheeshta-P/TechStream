import React, { useState, useEffect, forwardRef, useRef } from 'react';
import fetchSuggestion from '../util/fetchSuggestion';
import parse from 'html-react-parser';

function MarkdownEditor({ label, defaultValue = '' }, ref) {
  const [content, setContent] = useState(''); // Hold the markdown content
  const [suggestion, setSuggestion] = useState(''); // Hold the AI suggestion
  const debounceTimeoutRef = useRef(null);
  const textareaRef = useRef(null); // Reference to the textarea

  // Load default value on component mount
  useEffect(() => {
    setContent(defaultValue);
  }, [defaultValue]);

  // Check if the cursor is at the end of the text
  const isCursorAtEnd = () => {
    const textarea = textareaRef.current;
    return textarea && textarea.selectionStart === textarea.value.length;
  };

  // Handle text input and fetch suggestion when cursor is at the end
  const handleInput = (e) => {
    const text = e.target.value; // Get current text value from textarea
    setContent(text); // Update content state
    setSuggestion(''); // Clear any previous suggestion

    if (isCursorAtEnd()) {
      // Debounce the API call to avoid making requests on every keystroke
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(async () => {
        const suggestion = await fetchSuggestion(text); // Fetch AI suggestion based on the latest content
        setSuggestion(suggestion); // Update suggestion state
      }, 1500); // Adjust delay as needed
    }
  };

  return (
    <div className="w-full h-[300px]">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <div className="w-full bg-white text-black h-full border border-gray-200 px-3 py-2 rounded-lg">
        {/* Textarea to hold real input */}
        <textarea
          ref={textareaRef} // Use the ref for textarea
          spellCheck="false"
          className="outline-none w-full h-full"
          value={content} // Bind value to content state
          onChange={handleInput} // Use onChange to update value properly
        />
        {/* Suggestions */}
        {suggestion && (
          <div className="text-zinc-500 mt-2">
            <span>{suggestion}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(MarkdownEditor);
