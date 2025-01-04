'use client'

import React, { useEffect, useState } from 'react';
import { addStyles, StaticMathField } from 'react-mathquill'

addStyles()


// Element component to map block elements
const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
      case 'image':
        return (
          <div style={{ textAlign: element.align }}>
            <div>
            <img
              src={element.url}
              alt={element.alt || 'Image'}
              style={{ maxWidth: '100%', height: 'auto' }}
              {...attributes}
            />
            </div>
            <p style={{fontStyle:'italic', fontSize:14}}>
            {children}
            </p>
          </div>
        )
      case 'link':
      return (
        <a href={element.url} {...attributes} style={{ color: 'blue', textDecoration: 'underline' }}>
          {children}
        </a>
      )
      case 'math':
      return <StaticMathField>{element.latex}</StaticMathField>
      // return <div style={{fontSize:20}} dangerouslySetInnerHTML={{ __html: katex.renderToString(element.latex?element.latex:"", { throwOnError: false }) }} />;
      // case 'paragraph':
      //   if(element.children[0].text=="")
      //   {
      //     console.log("new line")
      //     return <p>&nbsp;</p>
      //   }
      //   else {
      //     return <p style={style} {...attributes}>
      //     {children}
      //   </p>
      //   }
    default:
      if(element.children.length == 1 && element.children[0].text=="")
          {
            console.log("new line")
            return <p>&nbsp;</p>
          }
          else {
            return <p style={style} {...attributes}>
            {children}
          </p>
          }
      // return (
      //   <p style={style} {...attributes}>
      //     {children}
      //   </p>
      // );
  }
};

// Leaf component to map text formatting
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }
  // if (!children) {
  //   children = <span>&nbsp;</span>; // Render a non-breaking space for empty lines
  // }
  return <span {...attributes}>{children}</span>;
};

// Main RichTextRenderer component
const RichTextRenderer = ({ value }) => {
  return (
    <div>
      {value.map((node, index) => (
        <ElementRenderer key={index} node={node} />
      ))}
    </div>
  );
};

// Recursive rendering function for elements and leaves
const ElementRenderer = ({ node }) => {
  if (!node.children) return null;

  const { type, children, ...attributes } = node;

  return (
    <Element element={node} attributes={attributes}>
      {children.map((child, index) => {
        if (child.type) {
          // Render nested element
          return <ElementRenderer key={index} node={child} />;
        }
        // Render leaf
        return <Leaf key={index} leaf={child}>{child.text}</Leaf>;
      })}
    </Element>
  );
};

// Example usage with the provided initialValue
const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

const RenderRTE = ({value}) => {
    const [editorValue, setEditorValue] = useState(value || initialValue);

    useEffect(() => {
      if (JSON.stringify(value) !== JSON.stringify(editorValue)) {
        setEditorValue(value);
      }
    }, [value]); // Only update when `value` changes
  

  return <RichTextRenderer value={editorValue} />;
};

export default RenderRTE;
