"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import { connectToDatabase } from "./services/databaseService"
//import { gamesRouter } from "./routes/gamesRoute";
const dessertDbService_1 = require("./services/dessertDbService");
const dessertRoute_1 = require("./routes/dessertRoute");
const indexRoute_1 = require("./routes/indexRoute");
const userRoute_1 = require("./routes/userRoute");
// const allowedOrigins: string[] = ['http://localhost:5000/api'];
// const coresoptions : cors.CorsOptions = {
//   origin: allowedOrigins
// };
const PORT = process.env.PORT;
//const port = config.get<number>("port");
//console.log("config : ",  config.get('users'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.use("/", indexRoute_1.indexRouter);
app.use("/api/user", userRoute_1.userRouter);
app.use("/api/desserts", dessertRoute_1.dessertRouter);
//app.use("/api/games", gamesRouter);
// connectToDatabase().then(()=>{
//   console.log("Connect To Database OK !");
// }).catch((error)=>{
//   console.log("Fail To Database Error !");
// })
(0, dessertDbService_1.connectToDatabase1)()
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
