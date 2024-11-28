import { NextApiRequest, NextApiResponse } from "next";
import { readData, writeData, DataItem } from "../../../data/database";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = readData();

  if (req.method === "GET") {
    res.status(200).json(data);

  } else if (req.method === "POST") {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newItem: DataItem = {
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
      title,
    };
    data.push(newItem);
    writeData(data);

    res.status(201).json(newItem);

  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
