const express = require("express");
const productController = require("../controllers/productController");
const multerMiddleware = require("../utils/multer");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/new", upload.array("images"), productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/single/:productId", productController.getProductById);
router.put("/update/:productId", productController.updateProduct);
router.delete("/delete/:productId", productController.deleteProduct);

module.exports = router;
