// External dependencies
import { ObjectId } from "mongodb";


// Class Implementation
export default class Dessert {
  constructor(
    public dessert_id: string,
    public dessert_name: string, 
    public dessert_slug: string,
    public dessert_image: string,
    public dessert_category: string,
    public dessert_brand: string,
    public dessert_price: number,
    public dessert_countInstock: number,
    public dessert_description: string,
    public dessert_rating: number,
    public dessert_numReviews: number,
    public id?: ObjectId
  ) {}
}
