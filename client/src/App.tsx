import React, { createContext, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Frame1 from '../src/frames/frame1'
import Frame2 from '../src/frames/frame2'
import Frame3 from '../src/frames/frame3'

import { useAppSelector } from './hooks'

import RoomSelectionDialog from './components/RoomSelectionDialog'
import LoginDialog from './components/LoginDialog'
import ComputerDialog from './components/ComputerDialog'
import WhiteboardDialog from './components/WhiteboardDialog'
import VideoConnectionDialog from './components/VideoConnectionDialog'
import Chat from './components/Chat'
import HelperButtonGroup from './components/HelperButtonGroup'
import MobileVirtualJoystick from './components/MobileVirtualJoystick'

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
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
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
        <Route path="/task2" element={<FullScreenFrame><Frame2 onBack={() => navigate('/')} /></FullScreenFrame>} />
        <Route path="/task3" element={<FullScreenFrame><Frame3 onBack={() => navigate('/')} /></FullScreenFrame>} />
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