import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Placeholder from '@tiptap/extension-placeholder';
import EditorToolbar from './EditorToolbar';
import ImageUploader from '../ImageUploader';

interface EnhancedEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const EnhancedEditor: React.FC<EnhancedEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start typing...'
}) => {
  const [showImageUploader, setShowImageUploader] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ml-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-4',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'pl-1 ml-4',
          },
        },
        code: {
          HTMLAttributes: {
            class: 'bg-gray-100 rounded px-1 py-0.5 font-mono text-sm',
          },
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-900 rounded-lg p-4 font-mono text-sm text-white overflow-x-auto',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg',
        },
        inline: false,
        allowBase64: true,
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'not-prose pl-0 list-none',
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: 'flex items-start',
        },
        nested: true,
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  const handleImageUpload = async (file: File) => {
    if (!editor) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      }
    };
    reader.readAsDataURL(file);
    setShowImageUploader(false);
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <EditorToolbar 
        editor={editor} 
        onImageClick={() => setShowImageUploader(true)}
      />
      
      <div className="relative">
        <EditorContent editor={editor} />
        
        {showImageUploader && (
          <div className="absolute inset-0 bg-white">
            <ImageUploader
              onImageSelect={handleImageUpload}
              onCancel={() => setShowImageUploader(false)}
              acceptedTypes={['image/jpeg', 'image/png', 'image/gif']}
              maxSize={5 * 1024 * 1024} // 5MB
            />
          </div>
        )}
      </div>

      <style>{`
        .ProseMirror {
          min-height: 200px;
          padding: 1rem;
        }
        .ProseMirror p {
          margin: 1em 0;
        }
        .ProseMirror > *:first-child {
          margin-top: 0;
        }
        .ProseMirror > *:last-child {
          margin-bottom: 0;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin: 1em 0;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin: 1em 0;
        }
        .ProseMirror li {
          margin: 0.5em 0;
          position: relative;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          display: block;
          cursor: pointer;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #e2e8f0;
          margin: 1em 0;
          padding-left: 1em;
          color: #64748b;
        }
        .ProseMirror code {
          background-color: #f1f5f9;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
        }
        .ProseMirror pre {
          background-color: #1e293b;
          color: #f8fafc;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
        }
        .ProseMirror pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
        .ProseMirror task-list {
          list-style: none;
          padding: 0;
        }
        .ProseMirror task-item {
          display: flex;
          align-items: flex-start;
          margin: 0.5em 0;
        }
        .ProseMirror task-item input[type="checkbox"] {
          margin: 0.2em 0.5em 0 0;
        }
      `}</style>
    </div>
  );
};

export default EnhancedEditor;