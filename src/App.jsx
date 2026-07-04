import { lazy, Suspense, useCallback, useState } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import LearningTab from './components/LearningTab'
import BottomNav from './components/BottomNav'
import Sidebar from './components/Sidebar'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import XpAnimation from './components/XpAnimation'
import AnimatedRobot from './components/AnimatedRobot'
import { useUser } from './context/UserContext'
import { useRobot } from './context/RobotContext'
import { BOSS_DATA } from './data/bossData'

import BackgroundSystem from './components/BackgroundSystem'

const LessonView = lazy(() => import('./components/LessonView'))
const Leaderboard = lazy(() => import('./components/Leaderboard'))
const Profile = lazy(() => import('./components/Profile'))
const Certificate = lazy(() => import('./components/Certificate'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))
const CodeArena = lazy(() => import('./components/CodeArena'))
const DuelMode = lazy(() => import('./components/DuelMode'))
const ProjectMode = lazy(() => import('./components/ProjectMode'))
const Library = lazy(() => import('./components/Library'))
const BossFight = lazy(() => import('./components/BossFight'))
const Premium = lazy(() => import('./components/Premium'))

function App() {
  const { stats, addXp, completeNode, completeSection, spendHeart, switchCourse, updateStreak } = useUser()
  const { triggerRobot } = useRobot()
  const [currentView, setCurrentView] = useState('dashboard')
  const [activeLessonId, setActiveLessonId] = useState(null)
  const [activeSectionId, setActiveSectionId] = useState(null)
  const [activeLessonStartStep, setActiveLessonStartStep] = useState(0)
  const [activeBossData, setActiveBossData] = useState(null)
  const [showXpAnim, setShowXpAnim] = useState(false)
  const [earnedXp, setEarnedXp] = useState(0)
  const [learningLocation, setLearningLocation] = useState({
    courseId: null,
    moduleId: null,
    sectionId: null,
    stepIndex: 0
  })

  const handleLoginSuccess = useCallback(() => {
    setCurrentView('dashboard')
  }, [])

  const handleLessonStepChange = useCallback((stepIndex) => {
    setLearningLocation(current => (
      current.stepIndex === stepIndex ? current : { ...current, stepIndex }
    ))
  }, [])

  if (!stats.isLoggedIn) {
    return <Auth onLoginSuccess={handleLoginSuccess} />
  }

  const handleStartLesson = (courseId, nodeId, sectionId = null, stepIndex = 0) => {
    if (!stats.isAdmin) {
      const courseProgress = stats.courses?.[courseId] || { completedNodes: [], unlockedNodes: [1] };
      const isPythonCourse = courseId === 'python';
      const previousModuleId = nodeId - 1;
      const previousHasBoss = BOSS_DATA[courseId]?.bosses?.some(boss => boss.moduleId === previousModuleId);
      const previousBossPassed = !previousHasBoss || courseProgress.completedNodes?.includes(previousModuleId * 100);
      const isAvailable = stats.isSuperAdmin
        ? nodeId === 1 || courseProgress.completedNodes?.includes(nodeId) || (courseProgress.completedNodes?.includes(previousModuleId) && previousBossPassed)
        : nodeId === 1 || courseProgress.completedNodes?.includes(nodeId) || (courseProgress.unlockedNodes?.includes(nodeId) && previousBossPassed);
      if (!isPythonCourse || !isAvailable) return;
    }
    if (!stats.isAdmin && stats.hearts <= 0) {
      alert("Yurakchalaringiz tugadi! Biroz kuting yoki ta'limni davom ettirish uchun to'ldiring.");
      return;
    }
    switchCourse(courseId)
    setLearningLocation({ courseId, moduleId: nodeId, sectionId, stepIndex })
    setActiveLessonId(nodeId)
    setActiveSectionId(sectionId)
    setActiveLessonStartStep(stepIndex)
    triggerRobot('happy', "Yangi dars boshladik! Muvaffaqiyatlar tilayman 🚀", 3000)
    setCurrentView('lesson')
  }

  const handleExitLesson = () => {
    setActiveLessonId(null)
    setActiveSectionId(null)
    triggerRobot('idle', "Charchadingizmi? Hechqisi yo'q, keyinroq davom ettiramiz!", 4000)
    setCurrentView('map')
  }

  const handleCompleteLesson = (wasCorrect, score = 0) => {
    if (stats.isAdmin) {
      setActiveLessonId(null)
      setActiveSectionId(null)
      triggerRobot('happy', "Admin preview yakunlandi. Foydalanuvchi progressi o'zgarmadi.", 3500)
      setCurrentView('map')
      return
    }
    if (wasCorrect && activeLessonId) {
      const hasBoss = BOSS_DATA[stats.currentCourse]?.bosses?.some(boss => boss.moduleId === activeLessonId)
      addXp(15)
      if (activeSectionId) {
        completeSection(activeLessonId, activeSectionId, score)
      } else {
        completeNode(activeLessonId, hasBoss ? null : activeLessonId + 1, score)
      }
      updateStreak()
      setEarnedXp(15)
      setShowXpAnim(true)
      triggerRobot('celebration', "Zo'r topdingiz! Yana bitta dars o'zlashtirildi 🎉", 5000)
    } else if (!wasCorrect) {
      spendHeart()
      triggerRobot('wrong', "Xato chiqdi, lekin hech qisi yo'q, keyingi safar aniq o'xshaydi! 💪", 5000)
    }
    setActiveLessonId(null)
    setActiveSectionId(null)
    setCurrentView('map')
  }

  const handleStartBoss = (bossData) => {
    if (!stats.isAdmin) {
      const completedNodes = stats.courses?.[stats.currentCourse]?.completedNodes || []
      if (!completedNodes.includes(bossData?.moduleId)) return
    }
    setLearningLocation({
      courseId: stats.currentCourse,
      moduleId: bossData.moduleId,
      sectionId: null,
      stepIndex: 0
    })
    setActiveBossData(bossData)
    triggerRobot('excited', "Tayyormisiz? Challenge boshlanmoqda! ⚔️", 4000)
    setCurrentView('boss')
  }

  const handleBossWin = (xp) => {
    if (stats.isAdmin) {
      setActiveBossData(null)
      triggerRobot('celebration', "Admin preview yakunlandi. Foydalanuvchi progressi o'zgarmadi.", 3500)
      setCurrentView('map')
      return
    }
    if (xp > 0) { addXp(xp); setEarnedXp(xp); setShowXpAnim(true); }
    // Unlock next node after boss
    if (activeBossData?.moduleId) {
      completeNode(
        activeBossData.moduleId * 100,      // synthetic boss node id
        activeBossData.moduleId + 1         // unlock next lesson module
      );
    }
    setActiveBossData(null)
    triggerRobot('celebration', "Siz super qahramonsiz! Challenge yengildi! 🎖️", 6000)
    setCurrentView('map')
  }

  const handleBossExit = () => {
    setActiveBossData(null)
    triggerRobot('sad', "Challenge'dan chiqdingiz. Kuch yig'ib yana qaytamiz! 🛡️", 4000)
    setCurrentView('map')
  }

  return (
    <div className="page-container">
      {/* Core Background System */}
      <BackgroundSystem />

      {!['lesson','certificate','project','library','boss'].includes(currentView) && (
          <Sidebar currentTab={currentView} onNavigate={setCurrentView} />
      )}

      <div className="global-wrapper"> 
        {!['lesson','certificate','project','library','boss'].includes(currentView) && <TopBar onLogoClick={() => setCurrentView('dashboard')} onNavigate={setCurrentView} />}

        <main className="main-content">
          <Suspense fallback={<div className="view-loading" role="status">Yuklanmoqda...</div>}>
          {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
          {currentView === 'admin' && stats.isAdmin && <AdminDashboard />}
          {currentView === 'map' && <LearningTab learningLocation={learningLocation} onLocationChange={setLearningLocation} onNodeClick={handleStartLesson} onBossStart={handleStartBoss} onClaimCertificate={() => setCurrentView('certificate')} onStartProject={() => setCurrentView('project')} onPremiumClick={() => setCurrentView('premium')} />}
          {currentView === 'leaderboard' && <Leaderboard />}
          {currentView === 'profile' && <Profile />}
          {currentView === 'arena' && <CodeArena />}
          {currentView === 'duel' && <DuelMode />}
          {currentView === 'premium' && <Premium onNavigate={setCurrentView} />}
          {currentView === 'project' && <ProjectMode onExit={() => setCurrentView('map')} />}
          {currentView === 'certificate' && <Certificate onBack={() => setCurrentView('map')} />}
          {currentView === 'library' && <Library onBack={() => setCurrentView('dashboard')} />}
          </Suspense>
        </main>
      </div>

      <Suspense fallback={<div className="view-loading" role="status">Dars yuklanmoqda...</div>}>
      {currentView === 'lesson' && (
        <LessonView
          onExit={handleExitLesson}
          onComplete={handleCompleteLesson}
          onStepChange={handleLessonStepChange}
          lessonId={activeLessonId}
          sectionId={activeSectionId}
          startStep={activeLessonStartStep}
        />
      )}

      {currentView === 'boss' && activeBossData && (
        <BossFight
          bossData={activeBossData}
          courseColor={activeBossData.color || '#3776AB'}
          onWin={handleBossWin}
          onLose={handleBossExit}
          onExit={handleBossExit}
        />
      )}
      </Suspense>

      {showXpAnim && <XpAnimation xpAmount={earnedXp} onComplete={() => setShowXpAnim(false)} />}

      {!['lesson', 'certificate', 'boss', 'duel', 'project'].includes(currentView) && <AnimatedRobot isFloating />}

      {!['lesson','courses','certificate','project','library','boss'].includes(currentView) && (
        <BottomNav currentTab={currentView} onTabSwitch={setCurrentView} />
      )}


    </div>
  )
}

export default App
