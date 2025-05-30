import dotenv from 'dotenv';
dotenv.config();
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    // service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Wrap in an async IIFE so we can use await.
// (async () => {
//     const info = await transporter.sendMail({
//         from: '"BookSwap" <noreply_BookSwap@gmail.com>',
//         to: "pragyanpatidar14@gmail.com",
//         subject: "Hello ✔",
//         text: "Hello world?", // plain‑text body
//         html: "<b>Hello world?</b>", // HTML body
//     });

//     console.log("Message sent:", info);
// })();