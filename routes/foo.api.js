import express from 'express'
const router = express.Router()
import { createFoo, getAllFoos, updateFooById, deleteFooById } from '../controllers/foo.controllers.js'
router.get('/', getAllFoos)
router.post('/', createFoo)
router.put('/:id', updateFooById)
router.delete('/:id', deleteFooById)
export default router
