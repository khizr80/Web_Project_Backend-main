import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: ".env",
});

app.listen(8000, () => {
  console.log("Server is running at port : 8000");
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB().catch((error) => {
  console.error("MONGO DB connection FAILED !! ", error);
});
