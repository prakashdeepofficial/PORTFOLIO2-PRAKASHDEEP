import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
 
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

router.post("/send", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(404).json({ message: "All fiels are required" })
        }

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Message from Portfolio - ${name}`,
            text: `
            Name: ${name}
            Email: ${email}

            Message:
            ${message}
        `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email sent successfully" })
    } catch (err) {
        return res.status(500).json({ success: false, error: "Email failed" });
    }
});

export default router;
