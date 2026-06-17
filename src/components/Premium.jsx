import { useUser } from '../context/UserContext';
import './Premium.css';

const premiumFeatures = [
    { icon: 'fa-lock-open', title: 'Barcha kurslar', text: 'HTML, CSS va JavaScript kurslari premium foydalanuvchilar uchun ochiladi.' },
    { icon: 'fa-certificate', title: 'Sertifikat', text: 'Kurs yakunida premium sertifikat olish imkoniyati tayyor turadi.' },
    { icon: 'fa-heart-circle-bolt', title: '150 hearts', text: 'Darslarda xato qilishdan qoʻrqmay mashq qilish uchun kengroq limit.' },
    { icon: 'fa-book-open-reader', title: 'Premium kutubxona', text: 'Qoʻshimcha adabiyotlar va loyiha shablonlarini monetizatsiya qilishga tayyor blok.' }
];

function Premium({ onNavigate }) {
    const { stats, activatePremiumDemo } = useUser();
    const premiumUntil = stats.premiumUntil ? new Date(stats.premiumUntil).toLocaleDateString('uz-UZ') : null;

    return (
        <div className="premium-page">
            <section className="premium-hero">
                <div className="premium-hero-content">
                    <span className="premium-kicker">DUOKOD PREMIUM</span>
                    <h1>Dasturlashni tezroq oching, platformani daromad modeliga tayyorlang</h1>
                    <p>
                        Premium orqali kurslar, sertifikat, ko'proq hearts va qo'shimcha resurslarni pullik paketga jamlash mumkin.
                    </p>
                    <div className="premium-actions">
                        <button className="premium-primary-btn" onClick={activatePremiumDemo}>
                            {stats.isPremium ? 'Premium faol' : 'Demo Premiumni yoqish'}
                        </button>
                        <button className="premium-secondary-btn" onClick={() => onNavigate('map')}>Kurslarni ko'rish</button>
                    </div>
                    {stats.isPremium && (
                        <div className="premium-active-note">
                            Premium faollashtirilgan{premiumUntil ? `: ${premiumUntil} gacha` : ''}.
                        </div>
                    )}
                </div>

                <div className="premium-price-card">
                    <div className="price-badge">Tavsiya etiladi</div>
                    <div className="price-title">Premium Start</div>
                    <div className="price-row">
                        <span>29 000</span>
                        <small>so'm / oy</small>
                    </div>
                    <ul>
                        <li><i className="fa-solid fa-check"></i> Barcha kurslar ochiq</li>
                        <li><i className="fa-solid fa-check"></i> 150 hearts paketi</li>
                        <li><i className="fa-solid fa-check"></i> Premium avatar</li>
                        <li><i className="fa-solid fa-check"></i> Sertifikat imkoniyati</li>
                    </ul>
                    <button className="price-cta" onClick={activatePremiumDemo}>Obunani sinab ko'rish</button>
                    <p className="payment-note">Keyingi bosqich: Payme, Click yoki Stripe integratsiyasi.</p>
                </div>
            </section>

            <section className="premium-feature-grid">
                {premiumFeatures.map((feature) => (
                    <article className="premium-feature-card" key={feature.title}>
                        <div className="premium-feature-icon"><i className={`fa-solid ${feature.icon}`}></i></div>
                        <h3>{feature.title}</h3>
                        <p>{feature.text}</p>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default Premium;
