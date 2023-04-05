"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Class Implementation
class Dessert {
    constructor(_id, name, slug, image, category, brand, price, countInstock, description, rating, numReviews, id) {
        this._id = _id;
        this.name = name;
        this.slug = slug;
        this.image = image;
        this.category = category;
        this.brand = brand;
        this.price = price;
        this.countInstock = countInstock;
        this.description = description;
        this.rating = rating;
        this.numReviews = numReviews;
        this.id = id;
    }
}
exports.default = Dessert;
