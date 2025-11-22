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
  "http://localhost:5173",
  "https://netflix-black-zeta.vercel.app",
  "https://netflix-git-main-niladripradhans-projects.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(null, false); // return false instead of throwing an error
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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
