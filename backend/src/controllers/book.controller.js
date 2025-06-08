import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const getBooks = asyncHandler(async (req,res) => {
    try {
        const books = await Book.find();

        if(!books) throw new ApiError(400,"Error in getting books");

        res.status(200).json(new ApiResponse(200, books))
    } catch (error) {   
        console.log(error);
        throw error
    }
}) 

const addBook = asyncHandler(async (req,res) => {

    const {title,author,description,publisher} = req.body;     

    if(!title || !author || !description || !publisher) throw new ApiError(400,"All fields required");

    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is required")
    }

    const coverImage = await uploadCloudinary(coverImageLocalPath);

    const book = await Book.create({
        title,
        author,
        description,
        publisher,
        coverImage: coverImage.url,
        owner: req.user._id
    })

    const createdBook = await Book.findById(book._id);

    if(!createdBook) throw new ApiError(500, "Something went wrong while adding new book")

    return res.status(201).json(
        new ApiResponse(200, "createdBook", "book added successfully")
    )
})

export {getBooks,addBook};