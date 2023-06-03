import express from 'express'
const router = express.Router()
import { createBoo, getAllBoos, addReference } from '../controllers/boo.controllers.js'
router.get('/', getAllBoos)
router.post('/', createBoo)
router.put('/:targetName', addReference) // Assuming addReference function is defined elsewhere
export default router
