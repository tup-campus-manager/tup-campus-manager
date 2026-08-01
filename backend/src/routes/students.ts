import { Router } from 'express'
import { students, Student } from '../data/students'

const router = Router()

// GET todos
router.get('/', (req, res) => {
  res.json(students)
})

// GET por id
router.get('/:id', (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id))
  if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' })
  res.json(student)
})

// POST agregar
router.post('/', (req, res) => {
  const newStudent: Student = {
    ...req.body,
    id: students.length + 1,
    active: true
  }
  students.push(newStudent)
  res.status(201).json(newStudent)
})

// PUT reemplazar
router.put('/:id', (req, res) => {
  const index = students.findIndex(s => s.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Estudiante no encontrado' })
  students[index] = { ...req.body, id: Number(req.params.id) }
  res.json(students[index])
})

// PATCH editar propiedad
router.patch('/:id', (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id))
  if (!student) return res.status(404).json({ message: 'Estudiante no encontrado' })
  Object.assign(student, req.body)
  res.json(student)
})

// DELETE eliminar
router.delete('/:id', (req, res) => {
  const index = students.findIndex(s => s.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Estudiante no encontrado' })
  const deleted = students.splice(index, 1)
  res.json(deleted[0])
})

module.exports = router