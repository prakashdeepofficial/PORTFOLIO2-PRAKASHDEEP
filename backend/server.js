import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import emailRoute from "./routes/email.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.BASE_URL,   // allow frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend is running ✔");
});

app.use("/api/email", emailRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
