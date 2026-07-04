import CourseSelector from './CourseSelector';
import LearningPath from './LearningPath';

function LearningTab({ learningLocation, onLocationChange, onNodeClick, onBossStart, onClaimCertificate, onStartProject }) {
    const selectedCourse = learningLocation.courseId;

    if (!selectedCourse) {
        return <CourseSelector onSelectCourse={courseId => onLocationChange({ courseId, moduleId: null, sectionId: null, stepIndex: 0 })} />;
    }

    return (
        <LearningPath
            selectedCourse={selectedCourse}
            selectedModuleId={learningLocation.moduleId}
            activeSectionId={learningLocation.sectionId}
            activeStepIndex={learningLocation.stepIndex}
            onModuleChange={moduleId => onLocationChange(current => ({ ...current, moduleId, sectionId: null, stepIndex: 0 }))}
            onNodeClick={onNodeClick}
            onBossStart={onBossStart}
            onClaimCertificate={() => onClaimCertificate(selectedCourse)}
            onStartProject={onStartProject}
            onBack={() => onLocationChange({ courseId: null, moduleId: null, sectionId: null, stepIndex: 0 })}
        />
    );
}

export default LearningTab;
