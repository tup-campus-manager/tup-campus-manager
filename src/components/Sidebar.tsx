import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import ListIcon from '@mui/icons-material/List'
import SettingsIcon from '@mui/icons-material/Settings'
import SchoolIcon from '@mui/icons-material/School'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <Box
      sx={{
        width: 240,
        minHeight: '100vh',
        backgroundColor: '#172033',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        py: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, mb: 2 }}>
        <SchoolIcon sx={{ color: '#60a5fa' }} />
        <Typography fontWeight={700} color="#f8fafc">
          Campus Manager
        </Typography>
      </Box>

      <List>
        <ListItemButton
          selected={currentPage === 'items'}
          onClick={() => onNavigate('items')}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#1e3a8a',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#f8fafc' }}>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Items" sx={{ color: '#f8fafc' }} />
        </ListItemButton>

        <ListItemButton
          selected={currentPage === 'settings'}
          onClick={() => onNavigate('settings')}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#1e3a8a',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#f8fafc' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configuración" sx={{ color: '#f8fafc' }} />
        </ListItemButton>
      </List>
    </Box>
  )
}

export default Sidebar