import './preview.css';
import { useRef, useEffect } from "react";

interface PreviewProps {
    code: string;
}

const html = `<html >
<head>
<style>
html {
    background-color: white;
}
</style>
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
</html>`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;

        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*')
        }, 50);

    }, [code])
    return <div className="preview-wrapper">
        <iframe
            ref={iframe}
            title="My child html"
            sandbox="allow-scripts"
            srcDoc={html}
        />
    </div>
};

export default Preview;