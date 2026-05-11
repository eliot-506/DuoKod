import { useState } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import LearningTab from './components/LearningTab'
import LessonView from './components/LessonView'
import Leaderboard from './components/Leaderboard'
import BottomNav from './components/BottomNav'
import Sidebar from './components/Sidebar'
import Profile from './components/Profile'
import Certificate from './components/Certificate'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import AdminDashboard from './components/AdminDashboard'
import CodeArena from './components/CodeArena'
import DuelMode from './components/DuelMode'
import ProjectMode from './components/ProjectMode'
import XpAnimation from './components/XpAnimation'
import Library from './components/Library'
import BossFight from './components/BossFight'
import { useUser } from './context/UserContext'
import { useRobot } from './context/RobotContext'
import AnimatedRobot from './components/AnimatedRobot'

import BackgroundSystem from './components/BackgroundSystem'

function App() {
  const { stats, addXp, completeNode, useHeart, switchCourse, updateStreak } = useUser()
  const { triggerRobot } = useRobot()
  const [currentView, setCurrentView] = useState('dashboard')
  const [activeLessonId, setActiveLessonId] = useState(null)
  const [activeBossData, setActiveBossData] = useState(null)
  const [showXpAnim, setShowXpAnim] = useState(false)
  const [earnedXp, setEarnedXp] = useState(0)

  if (!stats.isLoggedIn) {
    return <Auth onLoginSuccess={() => setCurrentView('dashboard')} />
  }

  const handleStartLesson = (courseId, nodeId) => {
    if (stats.hearts <= 0) {
      alert("Yurakchalaringiz tugadi! Biroz kuting yoki ta'limni davom ettirish uchun to'ldiring.");
      return;
    }
    switchCourse(courseId)
    setActiveLessonId(nodeId)
    triggerRobot('happy', "Yangi dars boshladik! Muvaffaqiyatlar tilayman 🚀", 3000)
    setCurrentView('lesson')
  }

  const handleExitLesson = () => {
    setActiveLessonId(null)
    triggerRobot('idle', "Charchadingizmi? Hechqisi yo'q, keyinroq davom ettiramiz!", 4000)
    setCurrentView('map')
  }

  const handleCompleteLesson = (wasCorrect) => {
    if (wasCorrect && activeLessonId) {
      addXp(15)
      completeNode(activeLessonId, activeLessonId + 1)
      updateStreak()
      setEarnedXp(15)
      setShowXpAnim(true)
      triggerRobot('celebration', "Zo'r topdingiz! Yana bitta dars o'zlashtirildi 🎉", 5000)
    } else if (!wasCorrect) {
      useHeart()
      triggerRobot('wrong', "Xato chiqdi, lekin hech qisi yo'q, keyingi safar aniq o'xshaydi! 💪", 5000)
    }
    setActiveLessonId(null)
    setCurrentView('map')
  }

  const handleStartBoss = (bossData) => {
    setActiveBossData(bossData)
    triggerRobot('excited', "Tayyormisiz? Challenge boshlanmoqda! ⚔️", 4000)
    setCurrentView('boss')
  }

  const handleBossWin = (xp) => {
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
          {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
          {currentView === 'admin' && stats.isAdmin && <AdminDashboard />}
          {currentView === 'map' && <LearningTab onNodeClick={handleStartLesson} onBossStart={handleStartBoss} onClaimCertificate={() => setCurrentView('certificate')} onStartProject={() => setCurrentView('project')} />}
          {currentView === 'leaderboard' && <Leaderboard />}
          {currentView === 'profile' && <Profile />}
          {currentView === 'arena' && <CodeArena />}
          {currentView === 'duel' && <DuelMode />}
          {currentView === 'project' && <ProjectMode onExit={() => setCurrentView('map')} />}
          {currentView === 'certificate' && <Certificate onBack={() => setCurrentView('map')} />}
          {currentView === 'library' && <Library onBack={() => setCurrentView('dashboard')} />}
        </main>
      </div>

      {currentView === 'lesson' && (
        <LessonView
          onExit={handleExitLesson}
          onComplete={handleCompleteLesson}
          lessonId={activeLessonId}
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

      {showXpAnim && <XpAnimation xpAmount={earnedXp} onComplete={() => setShowXpAnim(false)} />}

      {!['lesson','courses','certificate','project','library','boss'].includes(currentView) && (
        <BottomNav currentTab={currentView} onTabSwitch={setCurrentView} />
      )}


    </div>
  )
}

export default App
