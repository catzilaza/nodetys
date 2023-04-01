"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Class Implementation
class Dessert {
    constructor(dessert_id, dessert_name, dessert_slug, dessert_image, dessert_category, dessert_brand, dessert_price, dessert_countInstock, dessert_description, dessert_rating, dessert_numReviews, id) {
        this.dessert_id = dessert_id;
        this.dessert_name = dessert_name;
        this.dessert_slug = dessert_slug;
        this.dessert_image = dessert_image;
        this.dessert_category = dessert_category;
        this.dessert_brand = dessert_brand;
        this.dessert_price = dessert_price;
        this.dessert_countInstock = dessert_countInstock;
        this.dessert_description = dessert_description;
        this.dessert_rating = dessert_rating;
        this.dessert_numReviews = dessert_numReviews;
        this.id = id;
    }
}
exports.default = Dessert;
