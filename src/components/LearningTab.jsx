import CourseSelector from './CourseSelector';
import LearningPath from './LearningPath';

function LearningTab({ learningLocation, onLocationChange, onNodeClick, onBossStart, onClaimCertificate, onStartProject }) {
    const selectedCourse = learningLocation.courseId;

    if (!selectedCourse) {
        return <CourseSelector onSelectCourse={courseId => onLocationChange({ courseId, moduleId: null, stepIndex: 0 })} />;
    }

    return (
        <LearningPath
            selectedCourse={selectedCourse}
            selectedModuleId={learningLocation.moduleId}
            activeStepIndex={learningLocation.stepIndex}
            onModuleChange={moduleId => onLocationChange(current => ({ ...current, moduleId, stepIndex: 0 }))}
            onNodeClick={onNodeClick}
            onBossStart={onBossStart}
            onClaimCertificate={onClaimCertificate}
            onStartProject={onStartProject}
            onBack={() => onLocationChange({ courseId: null, moduleId: null, stepIndex: 0 })}
        />
    );
}

export default LearningTab;
