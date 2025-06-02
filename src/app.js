import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import customMorgan from "./utils/morgan.js";
import userRoutes from "./routes/user.routes.js"; // Import your route file
import fileRoutes from "./routes/file.routes.js";
import codeRoutes from "./routes/code.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://web-project-frontend-main.vercel.app",
  "https://web-project-frontend-main.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(customMorgan);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", userRoutes);
app.use("/file", fileRoutes);
app.use("/code", codeRoutes);

export { app };
