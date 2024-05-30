const { Router } = require("express");
const multer = require("multer");
const {
  index,
  create,
  deleteData,
  add,
} = require("../controllers/admin_controller");
const authentication = require("../middleware/middleware");

const adminrouter = Router();

const imageUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: imageUpload }).single("image");

adminrouter.get("/", index);

adminrouter.get("/create", add);

adminrouter.post("/create",upload,authentication, create);

adminrouter.get("/delete/:id", deleteData);

// adminrouter.patch("/update/:id", updateData);

module.exports = adminrouter;