import { useState, useEffect } from 'react';
import './CodeArena.css';

function CodeArena() {
    const [html, setHtml] = useState('<h1>Arena</h1>\n<p>DuoKod Playgrounga xush kelibsiz!</p>');
    const [css, setCss] = useState('body {\n  font-family: sans-serif;\n  background-color: #f4f4f9;\n  color: #333;\n}\n\nh1 {\n  color: #e34c26;\n  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);\n}');
    const [js, setJs] = useState('console.log("JavaScript ishlashga tayyor!");');
    const [python, setPython] = useState('print("Salom, Python!")');
    const [activeTab, setActiveTab] = useState('python');
    const [srcDoc, setSrcDoc] = useState('');

    const handleRun = () => {
        setSrcDoc(`
            <html>
                <head>
                    <style>
                        ${css}
                        #custom-console {
                            background: rgba(0, 0, 0, 0.85);
                            color: #00ff00;
                            font-family: 'Courier New', Courier, monospace;
                            padding: 10px;
                            margin-top: 20px;
                            border-radius: 5px;
                            border-left: 3px solid #00ffff;
                            white-space: pre-wrap;
                            display: none;
                        }
                        #custom-console:not(:empty) {
                            display: block;
                        }
                    </style>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.11.0/brython.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.11.0/brython_stdlib.min.js"></script>
                </head>
                <body onload="brython()">
                    ${html}
                    
                    <div id="custom-console"></div>
                    
                    <script>
                        // Intercept JS console.log
                        const log = console.log;
                        console.log = function(...args) {
                            log.apply(console, args);
                            const con = document.getElementById('custom-console');
                            con.innerHTML += '> ' + args.join(' ') + '<br>';
                        };
                    </script>

                    <script type="text/python">
import sys
from browser import document

class ConsoleOutput:
    def write(self, data):
        if data.strip():
            document["custom-console"].innerHTML += f"> {data}<br>"

sys.stdout = ConsoleOutput()

try:
${python.split('\\n').map(line => '    ' + line).join('\\n')}
except Exception as e:
    document["custom-console"].innerHTML += f"<span style='color:red'>{e}</span><br>"
                    </script>

                    <script>${js}</script>
                </body>
            </html>
        `);
    };

    useEffect(() => {
        handleRun();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="code-arena-container">
            <h2 className="arena-title">💻 Code Arena</h2>

            <div className="arena-editor-section">
                <div className="arena-tabs">
                    <button className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`} onClick={() => setActiveTab('html')}>HTML</button>
                    <button className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`} onClick={() => setActiveTab('css')}>CSS</button>
                    <button className={`tab-btn ${activeTab === 'js' ? 'active' : ''}`} onClick={() => setActiveTab('js')}>JS</button>
                    <button className={`tab-btn ${activeTab === 'python' ? 'active' : ''}`} onClick={() => setActiveTab('python')}>PYTHON</button>
                    <button className="run-btn" onClick={handleRun}>▶ Run</button>
                </div>

                <div className="editor-pane">
                    {activeTab === 'html' && (
                        <textarea
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                            className="code-input html-editor"
                            spellCheck="false"
                            placeholder="HTML kodingizni kiriting..."
                        />
                    )}
                    {activeTab === 'css' && (
                        <textarea
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                            className="code-input css-editor"
                            spellCheck="false"
                            placeholder="CSS kodingizni kiriting..."
                        />
                    )}
                    {activeTab === 'js' && (
                        <textarea
                            value={js}
                            onChange={(e) => setJs(e.target.value)}
                            className="code-input js-editor"
                            spellCheck="false"
                            placeholder="JavaScript kodingizni kiriting..."
                        />
                    )}
                    {activeTab === 'python' && (
                        <textarea
                            value={python}
                            onChange={(e) => setPython(e.target.value)}
                            className="code-input python-editor"
                            spellCheck="false"
                            placeholder="Python kodingizni kiriting..."
                        />
                    )}
                </div>
            </div>

            <div className="arena-output-section">
                <div className="output-header">Live Natija ✨</div>
                <iframe
                    srcDoc={srcDoc}
                    title="Code Output"
                    sandbox="allow-scripts allow-same-origin"
                    className="arena-iframe"
                />
            </div>
        </div>
    );
}

export default CodeArena;
