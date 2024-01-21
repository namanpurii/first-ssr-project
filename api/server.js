import express from "express"
import morgan from "morgan"
import cors from "cors"
import fs from "fs"
import { fileURLToPath } from "url"
import path, {dirname } from "path"

const server = express()
const port = 3000
var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {flags: 'a' })
server.use(morgan('combined', {stream: accessLogStream})) //middleware to log HTTP requests coming to the server

//Set EJS as the view engine
server.set("view engine", "ejs")
server.set("views", path.join(__dirname, "views"))

server.get("/", cors(corsOptions), (req, res)=>{
    const htmlContent = fs.readFileSync(path.join(__dirname, "views", "home.ejs"), "utf-8")
    // console.log(htmlContent)
    res.status(200).send(htmlContent)
    // res.status(200).json({msg: "Request received, working on nuances, try reaching out in a few minutes"});
})

server.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`)
})