import { Request, Response } from "express";
import { dessertData } from "../dessertData";

export function indexController(req: Request, res: Response) {
  const listImages = () => {
    return `${dessertData.map(
      (item) =>
        `<img src=${item.image} alt="item name" style="width:250px; height:250px"></img>`
    )}`;
  };
  res.send(listImages());
  //res.render('index', { title: 'Express' });
}


