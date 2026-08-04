import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'

interface Student {
  name: { first: string; last: string }
  email: string
  dob: { age: number }
  phone: string
  location: { country: string; state: string; city: string }
  picture: { medium: string }
}

const CACHE_KEY = 'students_cache'
const CACHE_DURATION = 5 * 60 * 1000

function getCache(): Student[] | null {
  const raw = localStorage.getItem(CACHE_KEY)
  if (!raw) return null
  const { data, timestamp } = JSON.parse(raw)
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(CACHE_KEY)
    return null
  }
  return data
}

function setCache(data: Student[]) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
}

function Items() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('firstName')

  useEffect(() => {
    const cached = getCache()
    if (cached) {
      setStudents(cached)
      setLoading(false)
      return
    }

    fetch('https://randomuser.me/api/?results=20')
      .then((res) => {
        if (!res.ok) throw new Error('Error al consultar la API')
        return res.json()
      })
      .then((json) => {
        setCache(json.results)
        setStudents(json.results)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('No se pudieron obtener los estudiantes. Intentá de nuevo más tarde.')
        setLoading(false)
      })
  }, [])

  const filtered = students
    .filter((s) => {
      const term = search.toLowerCase()
      return (
        s.name.first.toLowerCase().includes(term) ||
        s.name.last.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.location.city.toLowerCase().includes(term) ||
        s.location.country.toLowerCase().includes(term)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'firstName') return a.name.first.localeCompare(b.name.first)
      if (sortBy === 'lastName') return a.name.last.localeCompare(b.name.last)
      if (sortBy === 'age') return a.dob.age - b.dob.age
      return 0
    })

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Estudiantes
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nombre, email, ciudad..."
          sx={{ minWidth: 220 }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Ordenar por</InputLabel>
          <Select
            value={sortBy}
            label="Ordenar por"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="firstName">Nombre</MenuItem>
            <MenuItem value="lastName">Apellido</MenuItem>
            <MenuItem value="age">Edad</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
        {filtered.map((student, index) => (
          <Card key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
            <Avatar
              src={student.picture.medium}
              alt={student.name.first}
              sx={{ width: 64, height: 64, ml: 1 }}
            />
            <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
              <Typography sx={{ fontWeight: 700 }}>
                {student.name.first} {student.name.last}
              </Typography>
              <Typography variant="body2" color="text.secondary">{student.email}</Typography>
              <Typography variant="body2" color="text.secondary">Edad: {student.dob.age}</Typography>
              <Typography variant="body2" color="text.secondary">{student.phone}</Typography>
              <Typography variant="body2" color="text.secondary">
                {student.location.city}, {student.location.state}, {student.location.country}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default Items