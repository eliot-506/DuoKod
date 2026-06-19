import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Library.css';

const CATEGORY_META = {
    'HTML & CSS': { icon: 'fa-code', color: '#f97316', soft: '#fff1e8' },
    JavaScript: { icon: 'fa-bolt', color: '#ca8a04', soft: '#fef9c3' },
    Python: { icon: 'fa-terminal', color: '#2563eb', soft: '#dbeafe' },
    'Web Texnologiyalari': { icon: 'fa-globe', color: '#7c3aed', soft: '#ede9fe' },
    Boshqa: { icon: 'fa-book', color: '#0f766e', soft: '#ccfbf1' },
};

const getCategory = (article) => article.category?.trim() || 'Boshqa';

function Library({ onBack }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Barchasi');

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

    const categories = useMemo(() => {
        const found = [...new Set(articles.map(getCategory))];
        const preferred = Object.keys(CATEGORY_META).filter(category => found.includes(category));
        return [...preferred, ...found.filter(category => !preferred.includes(category))];
    }, [articles]);

    const visibleArticles = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase('uz');
        return articles.filter((article) => {
            const inCategory = activeCategory === 'Barchasi' || getCategory(article) === activeCategory;
            const searchableText = `${article.title || ''} ${article.content || ''} ${article.author || ''}`.toLocaleLowerCase('uz');
            return inCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
        });
    }, [activeCategory, articles, query]);

    const groupedArticles = useMemo(() => categories
        .map(category => ({
            category,
            articles: visibleArticles.filter(article => getCategory(article) === category),
        }))
        .filter(group => group.articles.length > 0), [categories, visibleArticles]);

    if (loading) {
        return (
            <div className="library-state">
                <div className="library-spinner"><i className="fa-solid fa-book-open"></i></div>
                <h2>Kutubxona tayyorlanmoqda</h2>
                <p>Adabiyotlar yuklanmoqda...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="library-state library-error">
                <div className="library-state-icon"><i className="fa-solid fa-triangle-exclamation"></i></div>
                <h2>Yuklashda xatolik</h2>
                <p>{error}</p>
                <button className="library-primary-btn" onClick={onBack}>Asosiy sahifaga qaytish</button>
            </div>
        );
    }

    return (
        <div className="library-page">
            <div className="library-shell">
                <nav className="library-nav">
                    <button className="library-back" onClick={onBack} aria-label="Asosiy sahifaga qaytish">
                        <i className="fa-solid fa-arrow-left"></i>
                        <span>Asosiy sahifa</span>
                    </button>
                    <div className="library-brand"><i className="fa-solid fa-layer-group"></i> DuoKod</div>
                </nav>

                <header className="library-hero">
                    <div className="library-hero-copy">
                        <span className="library-eyebrow"><i className="fa-solid fa-sparkles"></i> Bilimlar markazi</span>
                        <h1>O‘rganing. Sinab ko‘ring.<br /><span>Natijaga erishing.</span></h1>
                        <p>Dasturlash bo‘yicha saralangan qo‘llanmalar, maqolalar va PDF resurslar bir joyda.</p>
                        <div className="library-search-wrap">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Mavzu, muallif yoki kalit so‘z..."
                                aria-label="Kutubxonadan qidirish"
                            />
                            {query && <button onClick={() => setQuery('')} aria-label="Qidiruvni tozalash"><i className="fa-solid fa-xmark"></i></button>}
                        </div>
                    </div>
                    <div className="library-hero-art" aria-hidden="true">
                        <div className="hero-orbit orbit-one"></div>
                        <div className="hero-orbit orbit-two"></div>
                        <div className="hero-book-card book-card-back"><i className="fa-solid fa-code"></i></div>
                        <div className="hero-book-card book-card-front"><i className="fa-solid fa-book-open"></i></div>
                        <span className="hero-art-badge badge-code">&lt;/&gt;</span>
                        <span className="hero-art-badge badge-star"><i className="fa-solid fa-star"></i></span>
                    </div>
                </header>

                <section className="library-stats" aria-label="Kutubxona statistikasi">
                    <div><span><i className="fa-solid fa-book-open"></i></span><strong>{articles.length}</strong><p>ta resurs</p></div>
                    <div><span><i className="fa-solid fa-folder-tree"></i></span><strong>{categories.length}</strong><p>ta yo‘nalish</p></div>
                    <div><span><i className="fa-solid fa-file-pdf"></i></span><strong>{articles.filter(article => article.file_url).length}</strong><p>ta PDF qo‘llanma</p></div>
                </section>

                <main className="library-content">
                    <div className="library-section-heading">
                        <div>
                            <span className="section-kicker">Kolleksiya</span>
                            <h2>Kerakli adabiyotni toping</h2>
                        </div>
                        <span className="result-count">{visibleArticles.length} ta natija</span>
                    </div>

                    <div className="library-filters" role="group" aria-label="Kategoriya filtrlari">
                        {['Barchasi', ...categories].map(category => (
                            <button
                                key={category}
                                className={activeCategory === category ? 'active' : ''}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category === 'Barchasi' ? <i className="fa-solid fa-border-all"></i> : <i className={`fa-solid ${CATEGORY_META[category]?.icon || 'fa-book'}`}></i>}
                                {category}
                            </button>
                        ))}
                    </div>

                    {groupedArticles.length === 0 ? (
                        <div className="empty-library">
                            <div><i className="fa-solid fa-magnifying-glass"></i></div>
                            <h3>Hech narsa topilmadi</h3>
                            <p>Qidiruv so‘zini yoki tanlangan kategoriyani o‘zgartirib ko‘ring.</p>
                            <button onClick={() => { setQuery(''); setActiveCategory('Barchasi'); }}>Filtrlarni tozalash</button>
                        </div>
                    ) : groupedArticles.map(({ category, articles: categoryArticles }) => {
                        const meta = CATEGORY_META[category] || CATEGORY_META.Boshqa;
                        return (
                            <section key={category} className="library-category" style={{ '--category-color': meta.color, '--category-soft': meta.soft }}>
                                <div className="category-heading">
                                    <span className="category-icon"><i className={`fa-solid ${meta.icon}`}></i></span>
                                    <div><h3>{category}</h3><p>{categoryArticles.length} ta foydali material</p></div>
                                </div>
                                <div className="library-grid">
                                    {categoryArticles.map((article, index) => {
                                        const description = article.content?.trim() || "Ushbu resurs bo‘yicha batafsil o‘quv materiali.";
                                        return (
                                            <article key={article.id} className="library-card">
                                                <div className="card-topline">
                                                    <span className="card-type"><i className={`fa-solid ${article.file_url ? 'fa-file-pdf' : 'fa-newspaper'}`}></i> {article.file_url ? 'PDF qo‘llanma' : 'Maqola'}</span>
                                                    <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                                                </div>
                                                <h4>{article.title || 'Nomsiz adabiyot'}</h4>
                                                <p>{description.length > 145 ? `${description.slice(0, 145)}...` : description}</p>
                                                <div className="library-card-footer">
                                                    <span className="card-author"><i className="fa-solid fa-circle-user"></i> {article.author || 'DuoKod jamoasi'}</span>
                                                    {article.file_url ? (
                                                        <a href={article.file_url} target="_blank" rel="noreferrer" className="read-btn">
                                                            O‘qish <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                                        </a>
                                                    ) : <span className="coming-label">Tez orada</span>}
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </main>
            </div>
        </div>
    );
}

export default Library;
