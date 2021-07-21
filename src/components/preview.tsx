import { useRef, useEffect } from "react";

interface PreviewProps {
    code: string;
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
</html>`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;
        iframe.current.contentWindow.postMessage(code, '*')

    }, [code])
    return <iframe
        ref={iframe}
        title="My child html"
        sandbox="allow-scripts"
        srcDoc={html}
    />
};

export default Preview;