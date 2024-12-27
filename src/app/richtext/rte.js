'use client'
import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, useSlateStatic, ReactEditor } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  Path,
} from 'slate'
import { withHistory } from 'slate-history'
import { Button, Icon, Toolbar } from './components'
import katex from 'katex'
import 'katex/dist/katex.min.css' 
import { addStyles, EditableMathField } from 'react-mathquill'
addStyles();


const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}
const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']


const RichTextExample = ({ value, onChange }) => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => {
    const editor = withHistory(withReact(createEditor()))
    const { isInline } = editor
  
    // Mark 'link' elements as inline
    editor.isInline = element => {
      return element.type === 'link' ? true : isInline(element)
    }
  
    return editor
  }, [])

  const handleChange = useCallback(
        (newValue) => {
          const serializedValue = JSON.stringify(newValue);
          if (serializedValue !== value) { // Prevent redundant updates
            onChange(serializedValue);
          }
           
        },
        [onChange, value]
      );

      // const [isModalOpen, setModalOpen] = useState(false);

  // const insertMath = (mathValue) => {
  //   const mathNode = { type: 'math', latex: mathValue, children: [{ text: '' }] };
  //   Transforms.insertNodes(editor, mathNode);
  //   setModalOpen(false);
  // };
  
  return (
    <>
    
    <Slate editor={editor} initialValue={value ? JSON.parse(value) : [{ type: 'paragraph', children: [{ text: 'Hello' }] }]}
      onChange={handleChange} >
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
        <MathButton />
        {/* <BlockButton format="math" icon="functions" /> */}
        {/* <button
          onMouseDown={(e) => {
            e.preventDefault();
            setModalOpen(true);
          }}
        >
          Math
        </button> */}
        <InsertImageButton />
        <LinkButton />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => {
            if (event.key === 'Enter') {
                const { selection } = editor
                if (selection) {
                  const [match] = Array.from(
                    Editor.nodes(editor, {
                      at: selection,
                      match: n => SlateElement.isElement(n) && (n.type === 'image' || n.type === 'math'),
                    })
                  )
                  if (match) {
                    event.preventDefault()
                    Transforms.insertNodes(editor, {
                      type: 'paragraph',
                      children: [{ text: '' }],
                    })
                    return
                  }
                }
              }

              // Handle backspace to remove math nodes
            // if (event.key === 'Backspace') {
            //   const [mathNode] = Array.from(
            //     Editor.nodes(editor, {
            //       match: n => n.type === 'math',
            //     })
            //   )

            //   if (mathNode) {
            //     event.preventDefault()
            //     Transforms.removeNodes(editor, { at: ReactEditor.findPath(editor, mathNode[0]) })
            //     return
            //   }
            // }
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
    {/* <MathModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onInsert={(latex) => insertMath(editor,latex)}
      /> */}
    </>
  )
}
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes(editor, newProperties)
  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )
  return !!match
}
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}
// link utility functions
const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && n.type === 'link',
    })
    return !!link
  }
  
  const insertLink = (editor, url) => {
    if (!url) return
    const { selection } = editor
  
    if (!selection || Editor.string(editor, selection) === '') {
      // If there's no text selected, insert the link text as the URL itself
      Transforms.insertNodes(editor, {
        type: 'link',
        url,
        children: [{ text: url }],
      })
    } else {
      // Wrap the selected text with a link
      Transforms.wrapNodes(
        editor,
        { type: 'link', url, children: [] },
        { split: true }
      )
      Transforms.collapse(editor, { edge: 'end' })
    }
  }
  
  const removeLink = editor => {
    Transforms.unwrapNodes(editor, {
      match: n => !Editor.isEditor(n) && n.type === 'link',
    })
  }

  const insertMath = (editor, latex = '\\frac{1}{2}') => {
    const math = { type: 'math', latex, children: [{ text: '' }] };
    Transforms.insertNodes(editor, math);
  };
  


const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
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
        // return <div>
        //     <div style={{fontSize:20}} dangerouslySetInnerHTML={{ __html: katex.renderToString(element.latex?element.latex:"", { throwOnError: false }) }} />;
            
        //     </div>
        return <MathElement attributes={attributes} children={children} element={element} />;
  
      default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.code) {
    children = <code>{children}</code>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span>
}
const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault()
        
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}
const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const InsertImageButton = () => {
    const editor = useSlateStatic()
    return (
      <Button
        onMouseDown={event => {
          event.preventDefault()
          if (typeof window !== 'undefined') {
            const url = window.prompt('Enter the URL of the image:')
          
            url && insertImage(editor, url)
          }
          
        }}
      >
        <Icon>image</Icon>
      </Button>
    )
  }
  
  // Helper to insert an image
  const insertImage = (editor, url) => {
    const image = { type: 'image', url, children: [{ text: '' }] }
    Transforms.insertNodes(editor, image)
  }

  const LinkButton = () => {
    const editor = useSlate()
    return (
      <Button
        onMouseDown={event => {
          event.preventDefault()
          const isActive = isLinkActive(editor)
          if (isActive) {
            removeLink(editor)
          } else {
            if (typeof window !== 'undefined') {
              const url = window.prompt('Enter the URL of the link:')
              if (!url) return
              insertLink(editor, url)
          }
            
          }
        }}
      >
        <Icon>link</Icon>
      </Button>
    )
  }

  const MathButton = () => {
    const editor = useSlateStatic();
  
    return (
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          insertMath(editor);
        }}
      >
        <Icon>functions</Icon>
      </Button>
    );
  };
  // const MathToolbar = ({ children }) => (
  //   <div>{children}<MathButton /></div>
  // );

  // Render the Math Element using MathLive
const MathElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic();

  const handleLatexChange = (latex) => {
    console.log(latex)
    Transforms.setNodes(
      editor,
      { latex },
      { at: ReactEditor.findPath(editor, element) }
    );
  };

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <EditableMathField
          latex={element.latex}
          onChange={(mathField) => {
            handleLatexChange(mathField.latex());
          }}
        />
      </div>
      
      
    </div>
  );
};



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
  {
    type: 'image',
    url: 'https://via.placeholder.com/300',
    alt: 'Placeholder Image',
    align: 'center',
    children: [{ text: '' }],
  },
]
export default RichTextExample