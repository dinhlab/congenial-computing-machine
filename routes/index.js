import express from 'express'
import { sendResponse, AppError } from '../helpers/utils.js'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.status(200).send('Welcome!')
})

router.get('/template/:test', async (req, res, next) => {
  const { test } = req.params
  try {
    if (test === 'error') {
      throw new AppError(401, 'Access denied', 'Authentication Error')
    } else {
      sendResponse(res, 200, true, { data: 'template' }, null, 'template success')
    }
  } catch (err) {
    next(err)
  }
})

import fooRouter from './foo.api.js'
router.use('/foo', fooRouter)

import booRouter from './boo.api.js'
router.use('/boo', booRouter)

export default router
