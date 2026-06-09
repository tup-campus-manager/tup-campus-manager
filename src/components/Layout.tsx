import { useState } from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { type User } from 'firebase/auth'
import Sidebar from './Sidebar'
import BottomBar from './BottomBar'
import Items from '../pages/Items'
import Settings from '../pages/Settings'

interface LayoutProps {
  user: User
  onLogout: () => void
}

function Layout({ user, onLogout }: LayoutProps) {
  const [currentPage, setCurrentPage] = useState<string>('items')
  const isLargeScreen = useMediaQuery('(min-width:768px)')

  function renderPage() {
    if (currentPage === 'items') return <Items />
    if (currentPage === 'settings') return <Settings user={user} onLogout={onLogout} />
    return null
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isLargeScreen && (
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#eef2f6',
          pb: isLargeScreen ? 0 : 7,
        }}
      >
        {renderPage()}
      </Box>

      {!isLargeScreen && (
        <BottomBar currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
    </Box>
  )
}

export default Layout