import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./config/db.js";
import router from "./routes/userRoutes.js";

dotenv.config();

const app = express();
// app.use(cors({
//   origin: "http://localhost:5173", // frontend origin
//   origin: "https://netflix-black-zeta.vercel.app", // frontend origin
//   credentials: true // allow cookies to be sent
// }));
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://netflix-black-zeta.vercel.app" // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies
}));
app.use(express.json()); // for JSON requests
// app.use(express.urlencoded({ extended: true })); // for hide url encoded requests

app.use("/api/auth", router);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await ConnectDB(); // wait for DB connection
    app.listen(port, () => {
      console.log(`Server running successfully on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();

app.get("/", (req, res) => {
  res.send("Server is running for netflix");
});
