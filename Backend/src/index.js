import express from "express"
import cors from "cors"
import morgan from "morgan";
import dotenv from "dotenv"
import productsRoute from "../Routes/route.js";

dotenv.config();

const frontend_port = process.env.CLIENT_PORT;
const backend_port = process.env.SERVER_PORT;
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173,https://productstoreappv2.onrender.com,https://gifted-store.onrender.com')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from origin ${origin}`));
    }
  },
  credentials: true,
};
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsOptions))
app.use(morgan("dev"))

app.use("/api", productsRoute);

app.listen(backend_port, ()=>{
    console.log(`serve is running on port: ${backend_port}`)
})
