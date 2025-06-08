import { addBook, getBooks } from "../controllers/book.controller.js";
import { upload } from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route('/addBook').post(
    verifyJWT,
    upload.fields([{ name: 'coverImage', maxCount: 1 }]),
    addBook
);

router.route('/getBooks').post(getBooks);

export default router;