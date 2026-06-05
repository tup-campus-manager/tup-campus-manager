import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Items() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700}>
        Items
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Acá van a aparecer los elementos obtenidos de la API.
      </Typography>
    </Box>
  )
}

export default Items