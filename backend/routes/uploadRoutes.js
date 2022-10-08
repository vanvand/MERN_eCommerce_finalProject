import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

// initalize storage engine with two objects
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/') // add destination where we want to upload to
  },
  filename(req, file, callback) {
    callback(
      null,
      // create filename dynamically in case user upload files with same name
      // also add file extension dynamically with paht.extname...
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

// restrict file types
function checkFileType(file, callback) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return callback(null, true)
  } else {
    callback('Images with jpg, jpeg or png file extension only!')
  }
}

const upload = multer({
  storage,
  // restrict file types with custom function
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router