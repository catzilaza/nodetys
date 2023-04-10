import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import { readdirSync } from "fs";

import { connectToDatabase } from "./services/dessertDbService";
import { dessertRouter } from "./routes/dessertRoute";
import { indexRouter } from "./routes/indexRoute";
import { userRouter } from "./routes/userRoute";

const PORT = process.env.PORT;
const app: Express = express();

app.use(express.json()); // แปลงข้อมูลที่มีรูปแบบ JSON String ให้อยู่ในรูป JSON Object
//app.use(express.urlencoded({ extended: false }))//โดยปกติ ข้อมูลที่ส่งจากฟอร์ม จะอยู่ในรูปแบบ URL encoding
app.use(cors());
app.use(morgan("dev")); // เก็บ log file

app.use(express.static("public"));

connectToDatabase()
  .then(() => {
    console.log("Connect To Database OK !");
  })
  .catch((error) => {
    console.log("Fail To Database Error !", error);
  });

app.use("/", indexRouter);
//app.use("/api", indexRouter);
app.use("/user", userRouter);
app.use("/desserts", dessertRouter);

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
