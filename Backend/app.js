import express from "express";
import cors from "cors"
import "dotenv/config";
import { dbConnect } from "./Config/db.connection.js";
import { userRouter } from "./Routes/user.routes.js";
const app = express();

app.use(express.json());
app.use(cors());



// ! mongo db connection
dbConnect();

// ! here is the server port
const port = process.env.PORT || 4000;


// ! user routes
app.use("/user",userRouter)




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
