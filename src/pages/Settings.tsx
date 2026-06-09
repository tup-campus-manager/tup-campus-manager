import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import SchoolIcon from '@mui/icons-material/School'

interface SettingsProps {
  onLogout: () => void
}

const mockUser = {
  name: 'Juan Pérez',
  email: 'juan.perez@campus.edu.ar',
  avatar: 'https://i.pravatar.cc/150?img=12',
}

function Settings({ onLogout }: SettingsProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  function handleLogoutConfirm() {
    sessionStorage.removeItem('session')
    setDialogOpen(false)
    onLogout()
  }

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600 }}>
      <Typography variant="h4" fontWeight={700}>
        Configuración
      </Typography>

      {/* Información del usuario */}
      <Card>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            src={mockUser.avatar}
            alt={mockUser.name}
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Typography variant="h6" fontWeight={700}>{mockUser.name}</Typography>
            <Typography variant="body2" color="text.secondary">{mockUser.email}</Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => setDialogOpen(true)}
            >
              Cerrar sesión
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Acerca de */}
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon sx={{ color: '#1d4ed8', fontSize: 32 }} />
            <Typography variant="h6" fontWeight={700}>Campus Manager</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="body2" color="text.secondary">Versión</Typography>
            <Typography variant="body1">0.0.0</Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">User Agent</Typography>
            <Typography
              variant="body2"
              sx={{
                wordBreak: 'break-all',
                backgroundColor: '#f1f5f9',
                p: 1,
                borderRadius: 1,
                fontFamily: 'monospace',
              }}
            >
              {navigator.userAgent}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Dialog de confirmación */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>¿Cerrar sesión?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que querés cerrar sesión? Vas a tener que volver a iniciar sesión la próxima vez.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Settings