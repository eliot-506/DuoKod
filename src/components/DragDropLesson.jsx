import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DragDropLesson.css';

function DragDropLesson({ blocks, correctAnswer, onChange, isChecked, isCorrect, terminalOutput }) {
    const [available, setAvailable] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        // Bloklarni chalkashtirib yuklash
        const shuffled = [...blocks].sort(() => Math.random() - 0.5);
        setAvailable(shuffled);
        setSelected([]);
        onChange('');
    }, [blocks]);

    const handleSelect = (block, index) => {
        if (isChecked) return;
        const newAvailable = [...available];
        newAvailable.splice(index, 1);
        const newSelected = [...selected, block];
        setAvailable(newAvailable);
        setSelected(newSelected);
        // Biz bo'sh joy qoldirmasdan yoki aynan kerak bo'lsa probel bilan ulashimiz mumkin:
        // Kodlarning toza qismlarini birlashtirish orqali tekshirish yaxshiroq.
        onChange(newSelected.join(' ')); 
    };

    const handleDeselect = (block, index) => {
        if (isChecked) return;
        const newSelected = [...selected];
        newSelected.splice(index, 1);
        const newAvailable = [...available, block];
        setSelected(newSelected);
        setAvailable(newAvailable);
        onChange(newSelected.join(' '));
    };

    return (
        <div className={`drag-drop-container ${isChecked ? (isCorrect ? 'correct-state' : 'incorrect-state') : ''}`}>
            
            <div className="build-area-wrapper">
                <span className="build-hint">Kodni shu yerga chertib yig'ing (Tap & Build) 🏗️:</span>
                <div className="build-area">
                    <AnimatePresence>
                        {selected.map((block, i) => (
                            <motion.button
                                layout
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: isChecked ? 1 : 1.05 }}
                                whileTap={{ scale: isChecked ? 1 : 0.95 }}
                                key={`sel-${block}-${i}`}
                                className="code-block selected-block"
                                onClick={() => handleDeselect(block, i)}
                                disabled={isChecked}
                            >
                                {block}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                    {selected.length === 0 && (
                        <span className="empty-placeholder">O'zbekona "Salom" ni chop eting...</span>
                    )}
                </div>

                <AnimatePresence>
                    {isChecked && isCorrect && terminalOutput && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mini-terminal"
                        >
                            <div className="terminal-header">
                                <div className="terminal-dot"></div>
                                <div className="terminal-dot"></div>
                                <div className="terminal-dot"></div>
                            </div>
                            <div className="terminal-content">
                                <div className="terminal-line"><span>$ python script.py</span></div>
                                <div className="terminal-line output">{terminalOutput}</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="available-area">
                <AnimatePresence>
                    {available.map((block, i) => (
                        <motion.button
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: isChecked ? 1 : 1.05 }}
                            whileTap={{ scale: isChecked ? 1 : 0.95 }}
                            key={`avail-${block}-${i}`}
                            className="code-block available-block"
                            onClick={() => handleSelect(block, i)}
                            disabled={isChecked}
                        >
                            {block}
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default DragDropLesson;
