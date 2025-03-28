import express from "express";
import cors from "cors"
import "dotenv/config";
import { dbConnect } from "./Config/db.connection.js";
import { userRouter } from "./Routes/user.routes.js";
import { app, server } from "./websocket.js"; //! from socket

app.use(express.json());
 
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://qubiko.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.options("*", cors());


// ! mongo db connection
dbConnect();

// ! here is the server port
const port = process.env.PORT || 4000;


// ! user routes
app.use("/user",userRouter)




server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
