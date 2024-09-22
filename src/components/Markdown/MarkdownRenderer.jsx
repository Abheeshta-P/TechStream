import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="browser-css text-base p-5 w-[98%] prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {content}
      </ReactMarkdown>
    </div>
  );
};
// Example usage
const post = {
  content: '# Heading\n\nhi new'
};


export default  MarkdownRenderer;