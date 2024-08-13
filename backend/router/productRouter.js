import express from "express"
import { login, register } from "../controllers/userController.js"
import { createProduct, deleteProduct, getAllProducts, getSingleProduct } from "../controllers/productController.js"
const router = express.Router()



router.post("/create" ,  createProduct )
router.get("/getall" , getAllProducts )
router.get("/product/:id" , getSingleProduct )
router.delete("/product/:id" , deleteProduct )


export default router 