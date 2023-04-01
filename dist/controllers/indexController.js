"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const dessertData_1 = require("../dessertData");
function indexController(req, res) {
    const listImages = () => {
        return `${dessertData_1.dessertData.map((item) => `<img src=${item.image} alt="item name" style="width:250px; height:250px"></img>`)}`;
    };
    res.send(listImages());
    //res.render('index', { title: 'Express' });
}
exports.indexController = indexController;
