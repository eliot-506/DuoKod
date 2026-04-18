import React from 'react';
import './SkillRadarChart.css';

const SkillRadarChart = ({ data, size = 300, color = '0, 255, 204' }) => {
    // Agar dars hali ishlanmagan bo'lsa
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="empty-radar" style={{ width: size, height: size }}>
                <i className="fa-solid fa-spider"></i>
                <p>Hali bu tilda malaka yo'q</p>
            </div>
        );
    }

    const labels = Object.keys(data);
    const values = Object.values(data);
    const numPoints = labels.length;

    // Eng katta balimizni topamiz. Kamida 100 gacha shkala saqlaymiz.
    const maxVal = Math.max(100, ...values);

    // Baza matematikasi
    const center = size / 2;
    const padding = 50; // Yozuvlar sig'ishi uchun
    const radius = center - padding;

    // Har bir burchak uchun funksiya
    const getPointCoords = (index, value, max) => {
        const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2; // -PI/2 to start at top (12 o'clock)
        const distance = (value / max) * radius;
        return {
            x: center + distance * Math.cos(angle),
            y: center + distance * Math.sin(angle),
            angle
        };
    };

    // To'rning fon chiziqlari (Grid Spider Web) - 4 daraja (halqalar)
    const renderGrid = () => {
        const levels = 4;
        const gridPolygons = [];
        for (let level = 1; level <= levels; level++) {
            const points = [];
            for (let i = 0; i < numPoints; i++) {
                const pt = getPointCoords(i, level * (maxVal / levels), maxVal);
                points.push(`${pt.x},${pt.y}`);
            }
            gridPolygons.push(
                <polygon
                    key={`grid-${level}`}
                    points={points.join(' ')}
                    className="radar-grid-polygon"
                />
            );
        }

        // Markazdan burchaklarga boruvchi nurlar (Spokes)
        const spokes = [];
        for (let i = 0; i < numPoints; i++) {
            const pt = getPointCoords(i, maxVal, maxVal);
            spokes.push(
                <line
                    key={`spoke-${i}`}
                    x1={center} y1={center}
                    x2={pt.x} y2={pt.y}
                    className="radar-grid-spoke"
                />
            );
        }

        return (
            <g>
                {gridPolygons}
                {spokes}
            </g>
        );
    };

    // Jonli foydalanuvchi ma'lumoti
    const renderDataPolygon = () => {
        const points = [];
        const circles = [];

        for (let i = 0; i < numPoints; i++) {
            const pt = getPointCoords(i, values[i], maxVal);
            points.push(`${pt.x},${pt.y}`);
            circles.push(
                <circle
                    key={`pt-${i}`}
                    cx={pt.x} cy={pt.y}
                    r={4}
                    className="radar-data-point"
                    style={{ stroke: `rgba(${color}, 1)`, fill: `rgba(${color}, 1)` }}
                >
                    <title>{labels[i].toUpperCase()}: {values[i]} XP</title>
                </circle>
            );
        }

        return (
            <g>
                <polygon
                    points={points.join(' ')}
                    className="radar-data-polygon"
                    style={{
                        fill: `rgba(${color}, 0.3)`,
                        stroke: `rgba(${color}, 1)`
                    }}
                />
                {circles}
            </g>
        );
    };

    // Atrofdagi Matnlar
    const renderLabels = () => {
        return labels.map((label, index) => {
            const pt = getPointCoords(index, maxVal, maxVal); // Eng chetki nuqta
            
            // Yozuv markazga tiqilib qolmasligi uchun biroz tashqariga suramiz
            const labelX = center + (pt.x - center) * 1.25;
            const labelY = center + (pt.y - center) * 1.15;
            
            return (
                <text
                    key={`label-${index}`}
                    x={labelX} y={labelY}
                    className="radar-label"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    {label.toUpperCase()}
                </text>
            );
        });
    };

    // XP raqami Hover uchun
    const renderValueLabels = () => {
        return labels.map((label, index) => {
            const pt = getPointCoords(index, values[i], maxVal);
            const labelX = center + (pt.x - center) * 1.0;
            const labelY = center + (pt.y - center) * 1.0;
            // Eslatma: values[index] emas i -> oops values[index] qilamiz
            return null; // O'rniga circle ustiga tooltip qo'ydik (title tegida)
        });
    }

    return (
        <div className="radar-chart-container" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {renderGrid()}
                {renderDataPolygon()}
                {renderLabels()}
            </svg>
        </div>
    );
};

export default SkillRadarChart;
