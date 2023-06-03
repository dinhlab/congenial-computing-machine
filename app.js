import express from 'express'
// import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import { sendResponse, AppError } from './helpers/utils.js'
import cors from 'cors'
import indexRouter from './routes/index.js'
dotenv.config()
const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public'))
app.use(cors())
import mongoose from 'mongoose'
const mongoURI = process.env.MONGODB_URI
mongoose
  .connect(mongoURI)
  .then(() => console.log(`DB connected ${mongoURI}`))
  .catch((err) => console.log(err))
app.use('/', indexRouter)
app.use((req, res, next) => {
  const err = new AppError(404, 'Not Found', 'Bad Request')
  next(err)
})
app.use((err, req, res, next) => {
  console.log('ERROR', err)
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    { message: err.message },
    err.isOperational ? err.errorType : 'Internal Server Error'
  )
})
const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
export default app
