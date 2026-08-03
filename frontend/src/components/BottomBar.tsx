import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import ListIcon from '@mui/icons-material/List'
import SettingsIcon from '@mui/icons-material/Settings'

interface BottomBarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

function BottomBar({ currentPage, onNavigate }: BottomBarProps) {
  return (
    <BottomNavigation
      value={currentPage}
      onChange={(_, newValue) => onNavigate(newValue)}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #d8dee8',
        zIndex: 100,
      }}
    >
      <BottomNavigationAction
        label="Items"
        value="items"
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        label="Configuración"
        value="settings"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  )
}

export default BottomBar