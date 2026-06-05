import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Settings() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700}>
        Configuración
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Acá va la información del usuario y opciones de la app.
      </Typography>
    </Box>
  )
}

export default Settings