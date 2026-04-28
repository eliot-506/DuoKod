import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { RobotProvider } from './context/RobotContext.jsx'

import ErrorBoundary from './ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RobotProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
      </RobotProvider>
    </UserProvider>
  </StrictMode>,
)
