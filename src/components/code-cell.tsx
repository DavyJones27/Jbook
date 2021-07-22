import { useState, useEffect } from "react";
import CodeEditor from './code-editor';
import Preview from './preview';
import bundler from '../bundler';
import Resizable from "./resizeable";

const CodeCell = () => {
    const [input, setInput] = useState<string>("");
    const [code, setCode] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler(input);
            setCode(output);
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [input])
    
    return <Resizable direction="vertical">
        <div style={{ height: '100%', display: "flex", flexDirection: "row" }}>
            <Resizable direction="horizontal">
                <CodeEditor
                    initialValue="const a = 'Ajay';"
                    onChange={(value) => setInput(value)}
                />
            </Resizable>
            <div>
            </div>
            <Preview code={code} />
        </div>
    </Resizable>
}


export default CodeCell;