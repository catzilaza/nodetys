// External dependencies
import { ObjectId } from "mongodb";


// Class Implementation
export default class Dessert {
  constructor(
    public _id: string,
    public name: string, 
    public slug: string,
    public image: string,
    public category: string,
    public brand: string,
    public price: number,
    public countInstock: number,
    public description: string,
    public rating: number,
    public numReviews: number,
    public id?: ObjectId
  ) {}
}
