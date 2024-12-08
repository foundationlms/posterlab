import React from 'react';
import { 
  Table, Plus, Trash2, ArrowUp, ArrowDown, 
  ArrowLeft, ArrowRight, AlignLeft, AlignCenter, 
  AlignRight, Grid 
} from 'lucide-react';
import { Editor } from '@tiptap/react';

interface TableControlsProps {
  editor: Editor;
}

const TableControls: React.FC<TableControlsProps> = ({ editor }) => {
  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
      {!editor.isActive('table') ? (
        <button
          onClick={addTable}
          className="flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Table className="h-4 w-4 mr-1" />
          Insert Table
        </button>
      ) : (
        <>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              className="p-1 rounded hover:bg-gray-200"
              title="Add Column Before"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className="p-1 rounded hover:bg-gray-200"
              title="Add Column After"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteColumn().run()}
              className="p-1 rounded hover:bg-gray-200 text-red-600"
              title="Delete Column"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300" />

          <div className="flex items-center space-x-1">
            <button
              onClick={() => editor.chain().focus().addRowBefore().run()}
              className="p-1 rounded hover:bg-gray-200"
              title="Add Row Before"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().addRowAfter().run()}
              className="p-1 rounded hover:bg-gray-200"
              title="Add Row After"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteRow().run()}
              className="p-1 rounded hover:bg-gray-200 text-red-600"
              title="Delete Row"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300" />

          <div className="flex items-center space-x-1">
            <button
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}
              className={`p-1 rounded hover:bg-gray-200 ${
                editor.isActive('tableHeader') ? 'bg-gray-200' : ''
              }`}
              title="Toggle Header"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="p-1 rounded hover:bg-gray-200 text-red-600"
              title="Delete Table"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300" />

          <div className="flex items-center space-x-1">
            <button
              onClick={() => editor.chain().focus().setCellAttribute('textAlign', 'left').run()}
              className="p-1 rounded hover:bg-gray-200"
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setCellAttribute('textAlign', 'center').run()}
              className="p-1 rounded hover:bg-gray-200"
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setCellAttribute('textAlign', 'right').run()}
              className="p-1 rounded hover:bg-gray-200"
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TableControls;