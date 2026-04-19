import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Library.css';

function Library({ onBack }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const { data, error: err } = await supabase
                    .from('articles')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (err) throw err;
                if (data) setArticles(data);
            } catch (err) {
                console.error("Adabiyotlarni yuklashda xato:", err);
                setError("Adabiyotlarni tarmoqdan yuklab bo'lmadi.");
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    const CATEGORIES = ['HTML & CSS', 'JavaScript', 'Python', 'Web Texnologiyalari', 'Boshqa'];

    if (loading) {
        return (
            <div className="library-loading">
                <div className="spinner"></div>
                <p>Adabiyotlar kutubxonadan yuklanmoqda...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="library-error">
                <h2>❌ Xatolik</h2>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={onBack}>Orqaga qaytish</button>
            </div>
        );
    }

    return (
        <div className="library-container">
            <div className="library-header">
                <button className="btn-back" onClick={onBack}><i className="fa-solid fa-arrow-left"></i> Asosiyga qaytish</button>
                <h1><i className="fa-solid fa-book-open" style={{ color: '#00e5ff', marginRight: '15px' }}></i> Kutubxona</h1>
                <p>Jami {articles.length} ta o'quv qo'llanma va maqolalar to'plami.</p>
            </div>

            {articles.length === 0 ? (
                <div className="empty-library">
                    Hozircha kutubxonaga adabiyotlar qo'shilmagan.
                </div>
            ) : (
                <div className="categories-wrapper">
                    {CATEGORIES.map(category => {
                        const catArticles = articles.filter(a => (a.category || 'Boshqa') === category);
                        if (catArticles.length === 0) return null;

                        return (
                            <div key={category} className="library-category">
                                <h3><i className="fa-solid fa-folder"></i> {category} <span>{catArticles.length} ta adabiyot</span></h3>
                                <div className="library-grid">
                                    {catArticles.map(article => (
                                        <div key={article.id} className="library-card">
                                            <h4>{article.title}</h4>
                                            <p>{article.content.substring(0, 150)}...</p>
                                            
                                            <div className="library-card-footer">
                                                <span><i className="fa-solid fa-user-pen"></i> {article.author}</span>
                                                {article.file_url && (
                                                    <a href={article.file_url} target="_blank" rel="noreferrer" className="btn btn-primary read-btn">
                                                        <i className="fa-solid fa-file-pdf"></i> O'qish (PDF)
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Library;
