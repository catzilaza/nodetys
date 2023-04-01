import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import { CorsOptions } from "cors";
import config from "config";
//import { connectToDatabase } from "./services/databaseService"
//import { gamesRouter } from "./routes/gamesRoute";

import { connectToDatabase1 } from "./services/dessertDbService";

import { dessertRouter } from "./routes/dessertRoute";
import { indexRouter } from "./routes/indexRoute";
import { userRouter } from "./routes/userRoute";
// const allowedOrigins: string[] = ['http://localhost:5000/api'];
// const coresoptions : cors.CorsOptions = {
//   origin: allowedOrigins
// };

const PORT = process.env.PORT;
//const port = config.get<number>("port");
//console.log("config : ",  config.get('users'));

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/desserts", dessertRouter);
//app.use("/api/games", gamesRouter);

// connectToDatabase().then(()=>{
//   console.log("Connect To Database OK !");
// }).catch((error)=>{
//   console.log("Fail To Database Error !");
// })

connectToDatabase1()
  .then(() => {
    console.log("Connect To Database OK !");
  })
  .catch((error) => {
    console.log("Fail To Database Error !", error);
  });

app.listen(PORT, () => {
  console.log(`[Server]: It is running at http://localhost:${PORT}`);
});

// connectToDatabase()
//     .then(() => {
//         app.use("/api/games", gamesRouter);

//         app.listen(PORT, () => {
//             console.log(`Server started at http://localhost:${PORT}`);
//         });
//     })
//     .catch((error: Error) => {
//         console.error("Database connection failed", error);
//         process.exit();
//     });
