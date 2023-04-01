import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/dessertDbService";
import Dessert from "../models/dessertModel";

// GET
export async function getDessertAll(req: Request, res: Response) {
  try {
    const desserts: Dessert[] =  (await collections.desserts.find({}).toArray()) as Dessert[];
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
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function getDessertById(req: Request, res: Response) {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const dessert = (await collections.desserts.findOne(query)) as Dessert;

    if (dessert) {
      res.status(200).send(dessert);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
}

// POST
export async function createDessert(req: Request, res: Response) {
  try {
    const newDessert = req.body as Dessert;
    const result = await collections.desserts.insertOne(newDessert);

    result
      ? res
          .status(201)
          .send(
            `Successfully created a new dessert with id ${result.insertedId}`
          )
      : res.status(500).send("Failed to create a new dessert.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
}

// PUT
export async function updateDessertById(req: Request, res: Response) {
  const id = req?.params?.id;

  try {
    const updatedDessert: Dessert = req.body as Dessert;
    const query = { _id: new ObjectId(id) };

    const result = await collections.desserts.updateOne(query, {
      $set: updatedDessert,
    });

    result
      ? res.status(200).send(`Successfully updated dessert with id ${id}`)
      : res.status(304).send(`Dessert with id: ${id} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
}

// Delete
export async function deleteDessertById(req: Request, res: Response) {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.desserts.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed dessert with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove dessert with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Dessert with id ${id} does not exist`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
}
