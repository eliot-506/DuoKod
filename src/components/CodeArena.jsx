import { useState, useEffect } from 'react';
import './CodeArena.css';
import { useRobot } from '../context/RobotContext';

function CodeArena() {
    const [html, setHtml] = useState('<div class="hero">\n  <h1>Code Arena</h1>\n  <p>DuoKod Playgrounga xush kelibsiz!</p>\n  <div class="glow"></div>\n</div>');
    const [css, setCss] = useState('body {\n  font-family: "Outfit", sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n  overflow: hidden;\n}\n\n.hero {\n  text-align: center;\n  position: relative;\n  z-index: 10;\n}\n\nh1 {\n  font-size: 4rem;\n  margin: 0;\n  background: linear-gradient(90deg, #3b82f6, #8b5cf6);\n  -webkit-background-clip: text;\n  color: transparent;\n}\n\n.glow {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 200px;\n  height: 200px;\n  background: #6366f1;\n  filter: blur(100px);\n  opacity: 0.3;\n  transform: translate(-50%, -50%);\n  z-index: -1;\n}');
    const [js, setJs] = useState('console.log("JavaScript ishlashga tayyor!");');
    const [python, setPython] = useState('print("Salom, Python!")');
    const [activeTab, setActiveTab] = useState('python');
    const [srcDoc, setSrcDoc] = useState('');
    const [runStatus, setRunStatus] = useState('ready'); // ready, running, success, error
    const { triggerRobot } = useRobot();

    const handleRun = () => {
        if (runStatus === 'running') return;
        setRunStatus('running');
        
        // Simulate execution time for better UX
        setTimeout(() => {
            try {
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
        ${python.split('\n').map(line => '    ' + line).join('\n')}
        except Exception as e:
            document["custom-console"].innerHTML += f"<span style='color:red'>{e}</span><br>"
                            </script>

                            <script>${js}</script>
                        </body>
                    </html>
                `);
                setRunStatus('success');
                triggerRobot('happy', "Kod ishga tushdi! Natijani o‘ng panelda ko‘ring 🚀", 4000);
            } catch (err) {
                setRunStatus('error');
            }
            
            setTimeout(() => {
                setRunStatus('ready');
            }, 2500);
        }, 600);
    };

    const handleReset = () => {
        setHtml('<div class="hero">\n  <h1>Code Arena</h1>\n  <p>DuoKod Playgrounga xush kelibsiz!</p>\n  <div class="glow"></div>\n</div>');
        setCss('body {\n  font-family: "Outfit", sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n  overflow: hidden;\n}\n\n.hero {\n  text-align: center;\n  position: relative;\n  z-index: 10;\n}\n\nh1 {\n  font-size: 4rem;\n  margin: 0;\n  background: linear-gradient(90deg, #3b82f6, #8b5cf6);\n  -webkit-background-clip: text;\n  color: transparent;\n}\n\n.glow {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 200px;\n  height: 200px;\n  background: #6366f1;\n  filter: blur(100px);\n  opacity: 0.3;\n  transform: translate(-50%, -50%);\n  z-index: -1;\n}');
        setJs('console.log("JavaScript ishlashga tayyor!");');
        setPython('print("Salom, Python!")');
        setSrcDoc('');
        setRunStatus('ready');
        triggerRobot('normal', "Kod tozalandi. Yangidan boshlaymiz!", 3000);
    };

    useEffect(() => {
        handleRun();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStatusContent = () => {
        switch(runStatus) {
            case 'running': return <><span className="status-dot-green" style={{background: '#F59E0B', boxShadow: '0 0 8px #F59E0B'}}></span> Running...</>;
            case 'success': return <><span className="status-dot-green"></span> Success</>;
            case 'error': return <><span className="status-dot-green" style={{background: '#EF4444', boxShadow: '0 0 8px #EF4444'}}></span> Error</>;
            default: return <><span className="status-dot-green"></span> Ready</>;
        }
    };

    return (
        <div className="arena-wrapper">
            <div className="arena-header">
                <div className="arena-header-titles">
                    <h2>💻 Code Arena</h2>
                    <p>Kodni yozing, RUN bosing va natijani shu yerning o‘zida ko‘ring.</p>
                </div>
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
                            
                            <div className="editor-controls">
                                <span className="editor-status">
                                    {getStatusContent()}
                                </span>
                                
                                <button className="reset-code-btn" onClick={handleReset} aria-label="Reset code" disabled={runStatus === 'running'}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                        <path d="M3 3v5h5"></path>
                                    </svg>
                                </button>
                                
                                <button className="run-code-btn" onClick={handleRun} disabled={runStatus === 'running'} style={{ opacity: runStatus === 'running' ? 0.7 : 1 }}>
                                    {runStatus === 'running' ? (
                                        <svg className="run-icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{animation: 'spin 1s linear infinite'}}>
                                            <line x1="12" y1="2" x2="12" y2="6"></line>
                                            <line x1="12" y1="18" x2="12" y2="22"></line>
                                            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                            <line x1="2" y1="12" x2="6" y2="12"></line>
                                            <line x1="18" y1="12" x2="22" y2="12"></line>
                                            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                        </svg>
                                    ) : (
                                        <svg className="run-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    )}
                                    {runStatus === 'running' ? 'Running' : 'Run code'}
                                </button>
                            </div>
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
