import "./text-editor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string>("# Header");
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)) {
                return;
            }
            setEditing(false);
        };
        document.addEventListener('click', listener, { capture: true });

        return () => {
            document.removeEventListener("click", listener, { capture: true })
        };
    }, []);

    if (editing) {
        return (
            <div className="text-editor card" ref={ref}>
                <div className="card-content">
                    <MDEditor value={value} onChange={(v) => setValue(v || "")} />
                </div>
            </div>
        );
    }

    return <div className="text-editor" onClick={() => setEditing(true)}>
        <MDEditor.Markdown source={value} />
    </div>;
}

export default TextEditor;