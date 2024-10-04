import React, { createContext, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Frame1 from '../src/frames/frame1'
import Frame1A from './frames/frame1A'
import Frame2 from './frames/frame2'
import Frame3 from './frames/frame3'
import Frame3A from './frames/frame3A'
import Frame4 from './frames/frame4'
import Frame5 from './frames/frame5'
import Frame8 from './frames/frame8'
import Frame8A from './frames/frame8A'
import Frame10 from '../src/frames/frame10'

import { useAppSelector } from './hooks'

import RoomSelectionDialog from './components/RoomSelectionDialog'
import LoginDialog from './components/LoginDialog'
import ComputerDialog from './components/ComputerDialog'
import WhiteboardDialog from './components/WhiteboardDialog'
import VideoConnectionDialog from './components/VideoConnectionDialog'
import Chat from './components/Chat'
import HelperButtonGroup from './components/HelperButtonGroup'
import MobileVirtualJoystick from './components/MobileVirtualJoystick'
import Frame9 from '../src/frames/frame9'
import Frame10A from './frames/frame10A'
import Frame7 from './frames/frame7'
import Frame6 from './frames/frame6'
import Frame6A from './frames/frame6A'
import Frame7A from './frames/frame7A'
import Frame9A from './frames/frame9A'
import Frame10B from './frames/frame10B'

declare global {
  interface Window {
    game?: Phaser.Game;
  }
}

const Backdrop = styled.div<{ $isGameRoute: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  display: ${props => props.$isGameRoute ? 'block' : 'none'};
`

const FullScreenFrame = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: black;
`

export const NavigationContext = createContext((path: string) => {});

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isGameRoute, setIsGameRoute] = useState(true)

  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const computerDialogOpen = useAppSelector((state) => state.computer.computerDialogOpen)
  const whiteboardDialogOpen = useAppSelector((state) => state.whiteboard.whiteboardDialogOpen)
  const roomJoined = useAppSelector((state) => state.room.roomJoined)

  useEffect(() => {
    setIsGameRoute(location.pathname === '/')
  }, [location])

  const handleNavigation = useCallback((path: string) => {
    navigate(path)
  }, [navigate])

  useEffect(() => {
    const game = window.game
    if (game && game.events) {
      game.events.on('setFrame', handleNavigation)
    }
    return () => {
      if (game && game.events) {
        game.events.off('setFrame', handleNavigation)
      }
    }
  }, [handleNavigation])

  let ui: JSX.Element
  if (loggedIn) {
    if (computerDialogOpen) {
      ui = <ComputerDialog />
    } else if (whiteboardDialogOpen) {
      ui = <WhiteboardDialog />
    } else {
      ui = (
        <>
          <MobileVirtualJoystick /> 
        </>
      )
    }
  } else if (roomJoined) {
    ui = <LoginDialog />
  } else {
    ui = <RoomSelectionDialog />
  }

  return (
    <NavigationContext.Provider value={handleNavigation}>
      <Backdrop $isGameRoute={isGameRoute}>
        {ui}
        {!computerDialogOpen && !whiteboardDialogOpen && <HelperButtonGroup />}
      </Backdrop>
      <Routes>
        <Route path="/task1" element={<FullScreenFrame><Frame1 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task1_continue" element={<FullScreenFrame><Frame1A onBack={() => navigate('/task1')} /></FullScreenFrame>} />
        <Route path="/task2" element={<FullScreenFrame><Frame2 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task3" element={<FullScreenFrame><Frame3 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task3_continue" element={<FullScreenFrame><Frame3A onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task4" element={<FullScreenFrame><Frame4 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task5" element={<FullScreenFrame><Frame5 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task6" element={<FullScreenFrame><Frame6 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task6_continue" element={<FullScreenFrame><Frame6A onBack={() => navigate('/task6')} /></FullScreenFrame>} />
        <Route path="/task7" element={<FullScreenFrame><Frame7 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task7_continue" element={<FullScreenFrame><Frame7A onBack={() => navigate('/task7')} /></FullScreenFrame>} />
        <Route path="/task8" element={<FullScreenFrame><Frame8 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task8_continue" element={<FullScreenFrame><Frame8A onBack={() => navigate('/task8')} /></FullScreenFrame>} />
        <Route path="/task9" element={<FullScreenFrame><Frame9 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task9_continue" element={<FullScreenFrame><Frame9A onBack={() => navigate('/task9')} /></FullScreenFrame>} />
        <Route path="/task10" element={<FullScreenFrame><Frame10 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task10_terminology" element={<FullScreenFrame><Frame10A onBack={() => navigate('/task10')} /></FullScreenFrame>} />
        <Route path="/task10_continue" element={<FullScreenFrame><Frame10B onBack={() => navigate('/task10_terminology')} /></FullScreenFrame>} />
        {/* <Route path='/continue' element={<FullScreenFrame><Frame10A onBack={() => navigate('/task10')} /></FullScreenFrame>} /> */}
      </Routes>
    </NavigationContext.Provider>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App