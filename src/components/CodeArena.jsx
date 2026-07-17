import { useEffect, useMemo, useState } from 'react';
import './CodeArena.css';
import { useRobot } from '../context/RobotContext';
import { useUser } from '../context/UserContext';

const DEFAULT_STARTER = {
    html: '<div class="hero">\n  <h1>Code Arena</h1>\n  <p>DuoKod Playgroundga xush kelibsiz!</p>\n  <div class="glow"></div>\n</div>',
    css: 'body {\n  font-family: "Outfit", sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n  overflow: hidden;\n}\n\n.hero {\n  text-align: center;\n  position: relative;\n  z-index: 10;\n}\n\nh1 {\n  font-size: 4rem;\n  margin: 0;\n  background: linear-gradient(90deg, #3b82f6, #8b5cf6);\n  -webkit-background-clip: text;\n  color: transparent;\n}\n\n.glow {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 200px;\n  height: 200px;\n  background: #6366f1;\n  filter: blur(100px);\n  opacity: 0.3;\n  transform: translate(-50%, -50%);\n  z-index: -1;\n}',
    js: 'console.log("JavaScript ishlashga tayyor!");',
    python: 'print("Salom, Python!")'
};

const ARENA_CHALLENGES = [
    {
        id: 'free-play',
        title: 'Erkin mashq',
        language: 'python',
        points: 0,
        timeLimit: 0,
        maxAttempts: 0,
        prompt: 'HTML, CSS, JavaScript yoki Python kodini erkin sinab ko‘ring.',
        tests: [],
        solution: 'Bu rejimda tayyor yechim yo‘q.',
        starter: DEFAULT_STARTER
    },
    {
        id: 'py-salom',
        title: 'Python: salomlashish',
        language: 'python',
        points: 100,
        timeLimit: 180,
        maxAttempts: 5,
        prompt: 'Konsolga aynan "Salom, Ali!" matnini chiqaring.',
        tests: [
            { name: 'Matn konsolga chiqarildi', includes: 'Salom, Ali!' },
            { name: 'print() ishlatildi', sourceIncludes: 'print(' }
        ],
        solution: 'print("Salom, Ali!")',
        starter: {
            ...DEFAULT_STARTER,
            python: '# Matnni konsolga chiqaring\n'
        }
    },
    {
        id: 'js-sum',
        title: 'JavaScript: yig‘indi',
        language: 'js',
        points: 120,
        timeLimit: 240,
        maxAttempts: 4,
        prompt: 'sum nomli funksiya yarating. U ikkita sonni qabul qilib, ularning yig‘indisini qaytarsin.',
        tests: [
            { name: 'sum(2, 3) = 5', expression: 'typeof sum === "function" && sum(2, 3) === 5' },
            { name: 'sum(-4, 10) = 6', expression: 'typeof sum === "function" && sum(-4, 10) === 6' },
            { name: 'return ishlatildi', sourceIncludes: 'return' }
        ],
        solution: 'function sum(a, b) {\n  return a + b;\n}\n\nconsole.log(sum(2, 3));',
        starter: {
            ...DEFAULT_STARTER,
            js: 'function sum(a, b) {\n  // kodingizni shu yerga yozing\n}\n\nconsole.log(sum(2, 3));'
        }
    },
    {
        id: 'html-card',
        title: 'Web: profil karta',
        language: 'html',
        points: 90,
        timeLimit: 210,
        maxAttempts: 5,
        prompt: 'HTML ichida .profile-card klassli blok, uning ichida h2 va button elementlarini yarating.',
        tests: [
            { name: '.profile-card mavjud', selector: '.profile-card' },
            { name: 'Karta ichida h2 bor', selector: '.profile-card h2' },
            { name: 'Karta ichida button bor', selector: '.profile-card button' }
        ],
        solution: '<div class="profile-card">\n  <h2>Ali</h2>\n  <button>Kuzatish</button>\n</div>',
        starter: {
            ...DEFAULT_STARTER,
            html: '<div class="profile-card">\n  \n</div>',
            css: 'body {\n  font-family: "Outfit", sans-serif;\n  background: #f8fafc;\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n\n.profile-card {\n  padding: 24px;\n  border: 1px solid #e2e8f0;\n  border-radius: 16px;\n  background: white;\n}'
        }
    }
];

const formatTime = (seconds) => {
    if (!seconds) return 'Cheksiz';
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const rest = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${rest}`;
};

function CodeArena() {
    const [selectedChallengeId, setSelectedChallengeId] = useState('py-salom');
    const selectedChallenge = useMemo(
        () => ARENA_CHALLENGES.find((challenge) => challenge.id === selectedChallengeId) ?? ARENA_CHALLENGES[0],
        [selectedChallengeId]
    );
    const [html, setHtml] = useState(selectedChallenge.starter.html);
    const [css, setCss] = useState(selectedChallenge.starter.css);
    const [js, setJs] = useState(selectedChallenge.starter.js);
    const [python, setPython] = useState(selectedChallenge.starter.python);
    const [activeTab, setActiveTab] = useState(selectedChallenge.language);
    const [srcDoc, setSrcDoc] = useState('');
    const [runStatus, setRunStatus] = useState('ready');
    const [attempts, setAttempts] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(selectedChallenge.timeLimit);
    const [testResult, setTestResult] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const { triggerRobot } = useRobot();
    const { unlockBadge } = useUser();

    const isChallengeMode = selectedChallenge.tests.length > 0;
    const attemptsLeft = selectedChallenge.maxAttempts ? Math.max(selectedChallenge.maxAttempts - attempts, 0) : null;
    const isLocked = isChallengeMode && (attemptsLeft === 0 || timeLeft === 0);

    useEffect(() => {
        const starter = selectedChallenge.starter;
        setHtml(starter.html);
        setCss(starter.css);
        setJs(starter.js);
        setPython(starter.python);
        setActiveTab(selectedChallenge.language);
        setSrcDoc('');
        setRunStatus('ready');
        setAttempts(0);
        setBestScore(0);
        setTimeLeft(selectedChallenge.timeLimit);
        setTestResult(null);
        setShowSolution(false);
    }, [selectedChallenge]);

    useEffect(() => {
        if (!isChallengeMode || !timeLeft || testResult?.passed === testResult?.total) return undefined;
        const timer = setInterval(() => {
            setTimeLeft((current) => Math.max(current - 1, 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [isChallengeMode, testResult, timeLeft]);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type !== 'duokod-arena-tests' || event.data.challengeId !== selectedChallenge.id) return;
            setTestResult(event.data);
            setBestScore((score) => Math.max(score, event.data.score));
            setRunStatus(event.data.passed === event.data.total ? 'success' : 'error');
            if (event.data.passed === event.data.total) {
                unlockBadge('arena_runner');
                triggerRobot('happy', `Challenge yakunlandi! ${event.data.score} ball olindi.`, 4000);
            } else {
                triggerRobot('normal', `${event.data.passed}/${event.data.total} test o‘tdi. Natijalarni tekshiring.`, 4000);
            }
            setTimeout(() => setRunStatus('ready'), 2500);
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [selectedChallenge, triggerRobot, unlockBadge]);

    const buildArenaDocument = (mode) => {
        const safeJavaScript = JSON.stringify(js).replaceAll('<', '\\u003c');
        const safePython = JSON.stringify(python).replaceAll('<', '\\u003c');
        const safeChallenge = JSON.stringify({
            id: selectedChallenge.id,
            mode,
            points: selectedChallenge.points,
            tests: selectedChallenge.tests,
            source: selectedChallenge.language === 'python' ? python : selectedChallenge.language === 'js' ? js : html
        }).replaceAll('<', '\\u003c');

        return `
            <html>
                <head>
                    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'unsafe-inline'; img-src data:; font-src data:">
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
                        #custom-console:not(:empty) { display: block; }
                    </style>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.11.0/brython.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.11.0/brython_stdlib.min.js"></script>
                </head>
                <body>
                    ${html}
                    <div id="custom-console"></div>
                    <script>
                        window.__duokodLogs = [];
                        const log = console.log;
                        console.log = function(...args) {
                            log.apply(console, args);
                            window.__duokodLogs.push(args.join(' '));
                            const con = document.getElementById('custom-console');
                            con.textContent += '> ' + args.join(' ') + '\\n';
                        };
                    </script>
                    <script>
                        const pythonScript = document.createElement('script');
                        pythonScript.type = 'text/plain';
                        pythonScript.id = 'duokod-python-source';
                        pythonScript.textContent = ${safePython};
                        document.body.appendChild(pythonScript);
                    </script>
                    <script type="text/python" id="duokod-python-runner">
import sys
from browser import document

class ConsoleOutput:
    def write(self, data):
        if data.strip():
            document["custom-console"].innerHTML += f"> {data}<br>"

sys.stdout = ConsoleOutput()

try:
    exec(document["duokod-python-source"].text)
except Exception as e:
    document["custom-console"].textContent += f"Xato: {e}\\n"
                    </script>
                    <script>
                        try { (0, eval)(${safeJavaScript}); }
                        catch (error) {
                            document.getElementById('custom-console').textContent += 'Xato: ' + error.message + '\\n';
                        }

                        function runArenaTests() {
                            const challenge = ${safeChallenge};
                            if (challenge.mode !== 'submit' || !challenge.tests.length) return;
                            const consoleText = document.getElementById('custom-console').textContent;
                            const results = challenge.tests.map((test) => {
                                let passed = false;
                                try {
                                    if (test.includes) passed = consoleText.includes(test.includes);
                                    if (test.sourceIncludes) passed = challenge.source.includes(test.sourceIncludes);
                                    if (test.selector) passed = Boolean(document.querySelector(test.selector));
                                    if (test.expression) passed = Boolean((0, eval)(test.expression));
                                } catch (error) {
                                    passed = false;
                                }
                                return { name: test.name, passed };
                            });
                            const passed = results.filter((result) => result.passed).length;
                            const total = results.length;
                            const score = total ? Math.round((passed / total) * challenge.points) : 0;
                            window.parent.postMessage({
                                type: 'duokod-arena-tests',
                                challengeId: challenge.id,
                                passed,
                                total,
                                score,
                                results
                            }, '*');
                        }

                        if (window.brython) brython();
                        setTimeout(runArenaTests, 800);
                    </script>
                </body>
            </html>
        `;
    };

    const handleRun = (mode = 'run') => {
        if (runStatus === 'running' || (mode === 'submit' && isLocked)) return;
        setRunStatus('running');
        if (mode === 'submit') {
            setAttempts((current) => current + 1);
            setTestResult(null);
        }

        setTimeout(() => {
            setSrcDoc(buildArenaDocument(mode));
            if (mode === 'run') {
                setRunStatus('success');
                unlockBadge('arena_runner');
                triggerRobot('happy', "Kod ishga tushdi! Natijani o‘ng panelda ko‘ring.", 4000);
                setTimeout(() => setRunStatus('ready'), 2500);
            }
        }, 500);
    };

    const handleReset = () => {
        const starter = selectedChallenge.starter;
        setHtml(starter.html);
        setCss(starter.css);
        setJs(starter.js);
        setPython(starter.python);
        setSrcDoc('');
        setRunStatus('ready');
        setTestResult(null);
        triggerRobot('normal', 'Kod tozalandi. Yangidan boshlaymiz!', 3000);
    };

    useEffect(() => {
        handleRun('run');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStatusContent = () => {
        switch (runStatus) {
            case 'running':
                return <><span className="status-dot-green warning"></span> Running...</>;
            case 'success':
                return <><span className="status-dot-green"></span> Success</>;
            case 'error':
                return <><span className="status-dot-green danger"></span> Test failed</>;
            default:
                return <><span className="status-dot-green"></span> Ready</>;
        }
    };

    return (
        <div className="arena-wrapper">
            <div className="arena-header">
                <div className="arena-header-titles">
                    <h2>Code Arena</h2>
                    <p>Challenge tanlang, kod yozing, testlardan o‘ting va ball oling.</p>
                </div>
                <div className="arena-score-card">
                    <span>Best score</span>
                    <strong>{bestScore}</strong>
                </div>
            </div>

            <div className="challenge-panel">
                <div className="challenge-selector">
                    {ARENA_CHALLENGES.map((challenge) => (
                        <button
                            key={challenge.id}
                            className={`challenge-chip ${selectedChallenge.id === challenge.id ? 'active' : ''}`}
                            onClick={() => setSelectedChallengeId(challenge.id)}
                        >
                            {challenge.title}
                        </button>
                    ))}
                </div>
                <div className="challenge-brief">
                    <div>
                        <span className="challenge-kicker">{selectedChallenge.language.toUpperCase()} challenge</span>
                        <h3>{selectedChallenge.title}</h3>
                        <p>{selectedChallenge.prompt}</p>
                    </div>
                    <div className="challenge-metrics">
                        <span>{selectedChallenge.points || 'Practice'} ball</span>
                        <span>{formatTime(timeLeft)}</span>
                        <span>{attemptsLeft === null ? 'Cheksiz' : `${attemptsLeft} urinish`}</span>
                    </div>
                </div>
            </div>

            <div className="arena-section">
                <div className="arena-grid">
                    <div className="editor-panel">
                        <div className="editor-toolbar">
                            <div className="arena-tabs">
                                <button className={`lang-tab ${activeTab === 'html' ? 'active' : ''}`} onClick={() => setActiveTab('html')}>HTML</button>
                                <button className={`lang-tab ${activeTab === 'css' ? 'active' : ''}`} onClick={() => setActiveTab('css')}>CSS</button>
                                <button className={`lang-tab ${activeTab === 'js' ? 'active' : ''}`} onClick={() => setActiveTab('js')}>JS</button>
                                <button className={`lang-tab ${activeTab === 'python' ? 'active' : ''}`} onClick={() => setActiveTab('python')}>Python</button>
                            </div>

                            <div className="editor-controls">
                                <span className="editor-status">{getStatusContent()}</span>
                                <button className="reset-code-btn" onClick={handleReset} aria-label="Reset code" disabled={runStatus === 'running'}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                        <path d="M3 3v5h5"></path>
                                    </svg>
                                </button>
                                <button className="run-code-btn secondary-run" onClick={() => handleRun('run')} disabled={runStatus === 'running'}>
                                    Run
                                </button>
                                <button className="run-code-btn" onClick={() => handleRun('submit')} disabled={runStatus === 'running' || isLocked || !isChallengeMode}>
                                    {runStatus === 'running' ? 'Checking' : 'Submit'}
                                </button>
                            </div>
                        </div>

                        <div className="editor-pane">
                            <div className="editor-line-numbers">
                                {Array.from({ length: 30 }, (_, i) => <div key={i}>{i + 1}</div>)}
                            </div>
                            {activeTab === 'html' && <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="code-input html-editor" spellCheck="false" placeholder="HTML kodingizni kiriting..." />}
                            {activeTab === 'css' && <textarea value={css} onChange={(e) => setCss(e.target.value)} className="code-input css-editor" spellCheck="false" placeholder="CSS kodingizni kiriting..." />}
                            {activeTab === 'js' && <textarea value={js} onChange={(e) => setJs(e.target.value)} className="code-input js-editor" spellCheck="false" placeholder="JavaScript kodingizni kiriting..." />}
                            {activeTab === 'python' && <textarea value={python} onChange={(e) => setPython(e.target.value)} className="code-input python-editor" spellCheck="false" placeholder="Python kodingizni kiriting..." />}
                        </div>
                    </div>

                    <div className="preview-panel">
                        <div className="preview-toolbar">
                            <div className="preview-title">
                                <span className="status-dot"></span> Live natija
                            </div>
                            <span className="engine-tag">DuoKod Engine</span>
                        </div>
                        <iframe
                            srcDoc={srcDoc}
                            title="Code Output"
                            sandbox="allow-scripts"
                            referrerPolicy="no-referrer"
                            className="arena-iframe"
                        />
                    </div>
                </div>

                <div className="test-panel">
                    <div className="test-panel-header">
                        <div>
                            <span className="challenge-kicker">Auto checker</span>
                            <h3>Test natijalari</h3>
                        </div>
                        {isChallengeMode && (
                            <button className="solution-toggle" onClick={() => setShowSolution((current) => !current)}>
                                {showSolution ? 'Yechimni yopish' : 'Yechimni ko‘rish'}
                            </button>
                        )}
                    </div>

                    {!isChallengeMode && <p className="test-empty">Erkin mashq rejimida test va ball berish yo‘q.</p>}
                    {isLocked && <p className="test-empty danger-text">Limit tugadi. Reset yoki boshqa challenge tanlang.</p>}
                    {isChallengeMode && !testResult && !isLocked && <p className="test-empty">Submit bosilgandan keyin testlar shu yerda ko‘rinadi.</p>}
                    {testResult && (
                        <div className="test-results">
                            <div className="test-score">
                                <strong>{testResult.score}</strong>
                                <span>{testResult.passed}/{testResult.total} test</span>
                            </div>
                            <div className="test-list">
                                {testResult.results.map((result) => (
                                    <div key={result.name} className={`test-row ${result.passed ? 'passed' : 'failed'}`}>
                                        <span>{result.passed ? 'PASS' : 'FAIL'}</span>
                                        <p>{result.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {showSolution && (
                        <pre className="solution-box"><code>{selectedChallenge.solution}</code></pre>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CodeArena;
