import { sendResponse, AppError } from '../helpers/utils.js'
import Boo from '../models/Boo.js'
import Foo from '../models/Foo.js'
import mongoose from 'mongoose'
// const booController = {}
// Create a boo
export const createBoo = async (req, res, next) => {
  // In a real project, you will get the info from req
  // const info = {
  //   name: 'any',
  //   description: 'any boo',
  // }
  const info = req.body
  try {
    // Always remember to control your inputs
    if (!info) throw new AppError(400, 'Bad Request', 'Create Boo Error')
    // In a real project, you must also check if id (referenceTo) is valid
    // as well as if the document with the given id exists before any further process
    // Mongoose query
    const created = await Boo.create(info)
    sendResponse(res, 200, true, { data: created }, null, 'Create boo Success')
  } catch (err) {
    next(err)
  }
}
// Update boo
export const addReference = async (req, res, next) => {
  // In a real project, you will get the info from req
  const { targetName } = req.params;
  const { ref } = req.body;
  try {
    // Always remember to control your inputs
    // In a real project, you must also check if id (referenceTo) is valid
    // as well as if the document with the given id exists before any further process
    let found = await Boo.findOne({ name: targetName });
    if (!found) {
      throw new AppError(404, 'Not Found', 'Boo not found');
    }
    const isValidObjectId = mongoose.Types.ObjectId.isValid(ref);
    if (!isValidObjectId) {
      throw new AppError(400, 'Bad Request', 'Invalid ID for the reference');
    }
    const refFound = await Foo.findById(ref);
    if (!refFound) {
      throw new AppError(404, 'Not Found', 'Foo not found');
    }
    found.referenceTo = ref;
    // Mongoose query
    found = await found.save();
    sendResponse(res, 200, true, { data: found }, null, 'Add reference success');
  } catch (err) {
    next(err);
  }
};
// Get all boo
export const getAllBoos = async (req, res, next) => {
  // In a real project, you will get conditions from req and then construct the filter object for the query
  // An empty filter means get all
  const filter = {}
  try {
    // Mongoose query
    const listOfFound = await Boo.find(filter).populate('referenceTo')
    // This queries data from the reference and appends it to the found result.
    sendResponse(res, 200, true, { data: listOfFound }, null, 'Found list of boos success')
  } catch (err) {
    next(err)
  }
}
