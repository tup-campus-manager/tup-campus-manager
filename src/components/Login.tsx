import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import SchoolIcon from '@mui/icons-material/School'

interface LoginProps {
  onLogin: () => void
}

function Login({ onLogin }: LoginProps) {
  const [loading, setLoading] = useState<boolean>(false)

  function handleClick() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 2000)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        backgroundColor: '#f5f5f5',
      }}
    >
      <SchoolIcon sx={{ fontSize: 80, color: '#1d4ed8' }} />

      <Typography variant="h4" fontWeight={700} color="#1f2937">
        Campus Manager
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Iniciá sesión para continuar
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={handleClick}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        sx={{ minWidth: 200 }}
      >
        {loading ? 'Verificando...' : 'Iniciar sesión'}
      </Button>
    </Box>
  )
}

export default Login