import { useState, useEffect } from "react";
import CodeEditor from './code-editor';
import Preview from './preview';
import bundler from '../bundler';
import Resizable from "./resizeable";
import { Cell } from "../state";
import { useActions } from '../hooks/use-actions'

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const [err, setErr] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const { updateCell } = useActions();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [cell.content])

    return <Resizable direction="vertical">
        <div style={{ height: 'calc(100% - 10px)', display: "flex", flexDirection: "row" }}>
            <Resizable direction="horizontal">
                <CodeEditor
                    initialValue={cell.content}
                    onChange={(value) => updateCell(cell.id, value)}
                />
            </Resizable>
            <div>
            </div>
            <Preview code={code} err={err} />
        </div>
    </Resizable>
}


export default CodeCell;