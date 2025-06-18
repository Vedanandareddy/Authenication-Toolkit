import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDb } from "./db/connectDB.js"
import authRoutes from './routes/auth.route.js'
import path from "path"

const app = express()
dotenv.config()
// used to access .env files 

if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend
    credentials: true // Allows cookies
  }));
}

const __dirname = path.resolve();


app.use(express.json())
// this parses incoming json body requests and allows us to get res.body 
app.use(cookieParser())
// allows to access incoming cookie by parsing it 

const PORT = process.env.PORT || 5000

app.use("/api/auth", authRoutes)

if (process.env.NODE_ENV === "production") {
  console.log("In production")
  // if in production serve the react application as the static assets 

  app.use(express.static(path.join(__dirname, "../frontend/dist"))) // this mentions that serve the  files in the given folder 

  app.get(/^\/(?!api).*/, (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    } catch (err) {
      console.error("Failed to serve index.html", err);
      res.status(500).send("Internal Server Error");
    }
  });


}



app.listen(PORT, () => {
  connectDb()
  console.log("Listening on PORT ", PORT)
})