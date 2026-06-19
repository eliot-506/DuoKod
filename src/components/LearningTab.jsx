import { useState } from 'react';
import CourseSelector from './CourseSelector';
import LearningPath from './LearningPath';

function LearningTab({ onNodeClick, onBossStart, onClaimCertificate, onStartProject }) {
    const [selectedCourse, setSelectedCourse] = useState(null);

    if (!selectedCourse) {
        return <CourseSelector onSelectCourse={setSelectedCourse} />;
    }

    return (
        <LearningPath
            selectedCourse={selectedCourse}
            onNodeClick={onNodeClick}
            onBossStart={onBossStart}
            onClaimCertificate={onClaimCertificate}
            onStartProject={onStartProject}
            onBack={() => setSelectedCourse(null)}
        />
    );
}

export default LearningTab;
