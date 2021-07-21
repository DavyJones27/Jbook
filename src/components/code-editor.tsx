import './code-editor.css';
import { useRef } from 'react';
import MoancoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, moancoEditor) => {
        editorRef.current = moancoEditor;
        moancoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });
        moancoEditor.getModel()?.updateOptions({ tabSize: 2 })
    }

    const onFormatClick = () => {
        const unFormatted = editorRef.current.getModel().getValue();

        const formatted = prettier.format(unFormatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, "");

        editorRef.current.setValue(formatted);
    }

    return <div className="editor-wrapper">
        <button
            className="button button-format is-primary is-small"
            onClick={onFormatClick}
        >
            Format
        </button>
        <MoancoEditor
            editorDidMount={onEditorDidMount}
            value={initialValue}
            language="javascript"
            theme="dark"
            height="500px"
            options={{
                wordWrap: "on",
                minimap: { enabled: false },
                showUnused: false,
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 16,
                scrollBeyondLastLine: false,
                automaticLayout: true,
            }} />
    </div>
}

export default CodeEditor;