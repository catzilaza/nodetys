"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
exports.indexRouter = (0, express_1.Router)();
exports.indexRouter.get('/', indexController_1.indexController);
//indexRouter.get('/', getDessertAll);
