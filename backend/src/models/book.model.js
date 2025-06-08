import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        coverImage:{
            type: String,
            required: true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps: true
    }
)

export const Book = mongoose.model('Book',bookSchema);