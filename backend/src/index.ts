import express from 'express'
import cors from 'cors'
import { students } from './data/students'
const studentsRouter = require('./routes/students')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/students', studentsRouter)

async function loadStudents() {
  try {
    const res = await fetch('https://randomuser.me/api/?results=20')
    const json = await res.json()
    json.results.forEach((s: any, index: number) => {
      students.push({ ...s, id: index + 1, active: true })
    })
    console.log(`✅ ${students.length} estudiantes cargados en memoria`)
  } catch (err) {
    console.error('❌ Error al cargar estudiantes:', err)
  }
}

// ✅ Primero levanta el servidor, después carga los datos
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  await loadStudents()
})