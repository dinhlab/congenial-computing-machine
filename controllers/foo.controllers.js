import { sendResponse, AppError } from '../helpers/utils.js'
import Foo from '../models/Foo.js'
// const fooController = {}
// Create a foo
export const createFoo = async (req, res, next) => {
  // In a real project, you will get the info from req
  // const info = {
  //   name: 'foo',
  //   flag: false,
  // }
  const info = req.body
  try {
    // Always remember to control your inputs
    if (!info) throw new AppError(402, 'Bad Request', 'Create Foo Error')
    // Mongoose query
    const created = await Foo.create(info)
    sendResponse(res, 200, true, { data: created }, null, 'Create Foo Success')
  } catch (err) {
    next(err)
  }
}
// Get all foo
export const getAllFoos = async (req, res, next) => {
  // In a real project, you will get conditions from req and then construct the filter object for the query
  // An empty filter means get all
  const filter = {}
  try {
    // Mongoose query
    const listOfFound = await Foo.find(filter)
    sendResponse(res, 200, true, { data: listOfFound }, null, 'Found list of foos success')
  } catch (err) {
    next(err)
  }
}
// Update a foo
export const updateFooById = async (req, res, next) => {
  // In a real project, you will get the id from req.
  // For updating and deleting, it is recommended to use a unique identifier such as _id to avoid duplication.
  // You will also get updateInfo from req.
  // An empty target and info mean update nothing
  const targetId = req.params.id
  const updateInfo = req.body
  // Options allow you to modify the query, e.g., new: true returns the latest update of data
  const options = { new: true }
  try {
    // Mongoose query
    const updated = await Foo.findByIdAndUpdate(targetId, updateInfo, options)
    sendResponse(res, 200, true, { data: updated }, null, 'Update foo success')
  } catch (err) {
    next(err)
  }
}
// Delete foo
export const deleteFooById = async (req, res, next) => {
  // In a real project, you will get the id from req.
  // For updating and deleting, it is recommended to use a unique identifier such as _id to avoid duplication.
  // An empty target means delete nothing
  // const targetId = '64799bf880fa0dc8382db419'
  const targetId = req.params
  // Options allow you to modify the query, e.g., new: true returns the latest update of data
  const options = { new: true }
  try {
    // Mongoose query
    const updated = await Foo.findByIdAndDelete(targetId, options)
    sendResponse(res, 200, true, { data: updated }, null, 'Delete foo success')
  } catch (err) {
    next(err)
  }
}
// Export
// export default fooController
