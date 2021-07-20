import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from './plugin/unpkg-path-plugin';


const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState<string>("");
    const [code, setCode] = useState<string>("");

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
    }

    useEffect(() => {
        startService()
    }, [])

    const onClick = async () => {
        if (!ref.current) {
            return;
        }

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        });
        console.log(result);

        setCode(result.outputFiles[0].text);
    }


    return <div>
        <textarea onChange={e => setInput(e.target.value)} value={input} />
        <div>
            <button onClick={onClick}>
                Submit
            </button>
        </div>
        <pre>
            {code}
        </pre>
    </div>
}

ReactDOM.render(
    <App />, document.querySelector("#root")
);