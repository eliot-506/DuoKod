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
        <div className="arena-wrapper">
            <div className="arena-header">
                <div className="arena-header-titles">
                    <h2>💻 Code Arena</h2>
                    <p>Kodni yozing, RUN bosing va natijani shu yerning o‘zida ko‘ring.</p>
                </div>
                <div className="arena-badge">Practice Mode</div>
            </div>

            <div className="arena-section">
                <div className="arena-grid">
                    
                    {/* LEFT PANEL: EDITOR */}
                    <div className="editor-panel">
                        <div className="editor-toolbar">
                            <div className="arena-tabs">
                                <button className={`lang-tab ${activeTab === 'html' ? 'active' : ''}`} onClick={() => setActiveTab('html')}>HTML</button>
                                <button className={`lang-tab ${activeTab === 'css' ? 'active' : ''}`} onClick={() => setActiveTab('css')}>CSS</button>
                                <button className={`lang-tab ${activeTab === 'js' ? 'active' : ''}`} onClick={() => setActiveTab('js')}>JS</button>
                                <button className={`lang-tab ${activeTab === 'python' ? 'active' : ''}`} onClick={() => setActiveTab('python')}>Python</button>
                            </div>
                            <button className="run-btn" onClick={handleRun}>
                                <i className="fa-solid fa-play"></i> RUN
                            </button>
                        </div>
                        
                        <div className="editor-pane">
                            <div className="editor-line-numbers">
                                {Array.from({ length: 30 }, (_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
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

                    {/* RIGHT PANEL: PREVIEW */}
                    <div className="preview-panel">
                        <div className="preview-toolbar">
                            <div className="preview-title">
                                <span className="status-dot"></span> Live Natija ✨
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>DuoKod Engine</span>
                        </div>
                        <iframe
                            srcDoc={srcDoc}
                            title="Code Output"
                            sandbox="allow-scripts allow-same-origin"
                            className="arena-iframe"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CodeArena;
