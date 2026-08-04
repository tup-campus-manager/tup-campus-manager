import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import SchoolIcon from '@mui/icons-material/School'
import { signInWithPopup } from 'firebase/auth'
import * as Sentry from '@sentry/react'
import { auth, googleProvider } from '../firebase/config'

import { trackEvent } from '../services/analytics.service'

interface LoginProps {
  onLogin: () => void
}

function Login({ onLogin }: LoginProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const result = await signInWithPopup(auth, googleProvider)

      // Evento 1 — Login con email (requerido por el TP9)
      trackEvent('login', {
        method: 'Google',
        user_email: result.user.email,
      })

      // Error forzado para Sentry (requerido por el TP9)
      Sentry.setUser({ email: result.user.email ?? undefined })
      Sentry.captureException(
        new Error(`Error forzado después del inicio de sesión de ${result.user.email}`),
      )

      onLogin()
    } catch (err) {
      console.error(err)
      setError('No se pudo iniciar sesión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
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

      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937' }}>
        Campus Manager
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Iniciá sesión para continuar
      </Typography>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        size="large"
        onClick={handleClick}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        sx={{ minWidth: 200 }}
      >
        {loading ? 'Verificando...' : 'Iniciar sesión con Google'}
      </Button>
    </Box>
  )
}

export default Login