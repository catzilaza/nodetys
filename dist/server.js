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
const morgan_1 = __importDefault(require("morgan"));
const dessertDbService_1 = require("./services/dessertDbService");
const dessertRoute_1 = require("./routes/dessertRoute");
const indexRoute_1 = require("./routes/indexRoute");
const userRoute_1 = require("./routes/userRoute");
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json()); // แปลงข้อมูลที่มีรูปแบบ JSON String ให้อยู่ในรูป JSON Object
//app.use(express.urlencoded({ extended: false }))//โดยปกติ ข้อมูลที่ส่งจากฟอร์ม จะอยู่ในรูปแบบ URL encoding
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev")); // เก็บ log file
app.use(express_1.default.static("public"));
(0, dessertDbService_1.connectToDatabase)()
    .then(() => {
    console.log("Connect To Database OK !");
})
    .catch((error) => {
    console.log("Fail To Database Error !", error);
});
app.use("/", indexRoute_1.indexRouter);
app.use("/api", indexRoute_1.indexRouter);
app.use("/api/user", userRoute_1.userRouter);
app.use("/api/desserts", dessertRoute_1.dessertRouter);
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
