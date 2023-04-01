"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDessertById = exports.updateDessertById = exports.createDessert = exports.getDessertById = exports.getDessertAll = void 0;
const mongodb_1 = require("mongodb");
const dessertDbService_1 = require("../services/dessertDbService");
// GET
function getDessertAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const desserts = (yield dessertDbService_1.collections.desserts.find({}).toArray());
            // const desserts: Dessert[] = (await collections.desserts.find({}).toArray()) as Dessert[];
            // const listImages = () => {
            //   return `${desserts.map(
            //     (item) =>
            //       `<div>
            //       <img src=${item.dessert_image} style="width:250px; height:250px"></img>
            //       <h4> ขนม : ${item.dessert_name} ราคา :  ${item.dessert_price} </h4>
            //       </div>`
            //   )}`;
            // };listImages()
            res.status(200).send(desserts);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.getDessertAll = getDessertAll;
function getDessertById(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const query = { _id: new mongodb_1.ObjectId(id) };
            const dessert = (yield dessertDbService_1.collections.desserts.findOne(query));
            if (dessert) {
                res.status(200).send(dessert);
            }
        }
        catch (error) {
            res
                .status(404)
                .send(`Unable to find matching document with id: ${req.params.id}`);
        }
    });
}
exports.getDessertById = getDessertById;
// POST
function createDessert(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newDessert = req.body;
            const result = yield dessertDbService_1.collections.desserts.insertOne(newDessert);
            result
                ? res
                    .status(201)
                    .send(`Successfully created a new dessert with id ${result.insertedId}`)
                : res.status(500).send("Failed to create a new dessert.");
        }
        catch (error) {
            console.error(error);
            res.status(400).send(error.message);
        }
    });
}
exports.createDessert = createDessert;
// PUT
function updateDessertById(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const updatedDessert = req.body;
            const query = { _id: new mongodb_1.ObjectId(id) };
            const result = yield dessertDbService_1.collections.desserts.updateOne(query, {
                $set: updatedDessert,
            });
            result
                ? res.status(200).send(`Successfully updated dessert with id ${id}`)
                : res.status(304).send(`Dessert with id: ${id} not updated`);
        }
        catch (error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    });
}
exports.updateDessertById = updateDessertById;
// Delete
function deleteDessertById(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const query = { _id: new mongodb_1.ObjectId(id) };
            const result = yield dessertDbService_1.collections.desserts.deleteOne(query);
            if (result && result.deletedCount) {
                res.status(202).send(`Successfully removed dessert with id ${id}`);
            }
            else if (!result) {
                res.status(400).send(`Failed to remove dessert with id ${id}`);
            }
            else if (!result.deletedCount) {
                res.status(404).send(`Dessert with id ${id} does not exist`);
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    });
}
exports.deleteDessertById = deleteDessertById;
