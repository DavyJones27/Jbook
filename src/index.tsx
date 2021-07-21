import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from './plugin/unpkg-path-plugin';
import { fetchPlugin } from './plugin/fetch-plugin';

const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState<string>("");

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
        });
    }

    useEffect(() => {
        startService()
    }, [])

    const onClick = async () => {
        if (!ref.current) {
            return;
        }

        iframe.current.srcdoc = html;

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        });

        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
    }

    const html = `<html>
                <head>
                </head>
                <body>
                    <div id="root"></div>
                    <script>
                    window.addEventListener('message', (event) => {
                    try{
                        eval(event.data);
                    } catch(err){
                        console.log(err)
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red;"> <h1> Run Time Error</h1>' + err + '</div>'
                        console.error(err);
                    }
                    }, false)
                    </script>
                </body>
                </html>`

    return <div>
        <textarea onChange={e => setInput(e.target.value)} value={input} />
        <div>
            <button onClick={onClick}>
                Submit
            </button>
        </div>
        <iframe ref={iframe} title="My child html" sandbox="allow-scripts" srcDoc={html} />
    </div>
}


ReactDOM.render(
    <App />, document.querySelector("#root")
);