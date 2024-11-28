import { NextApiRequest, NextApiResponse } from "next";
import { readData, writeData } from "../../../../data/database";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = readData();

    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid or missing ID" });
    }

    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
        return res.status(400).json({ error: "ID must be a number" });
    }

    if (req.method === "DELETE") {
        const filteredData = data.filter((item) => item.id !== itemId);

        if (filteredData.length === data.length) {
            return res.status(404).json({ error: `Item with ID ${id} not found` });
        }

        writeData(filteredData);
        return res.status(200).json({ message: `Item with ID ${id} deleted` });

    }
    else if (req.method === "PUT") {
        const { title } = req.body;

        if (!id || !title) {
            return res.status(400).json({ error: "ID and title are required" });
        }

        const itemIndex = data.findIndex((item) => item.id === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ error: `Item with ID ${id} not found` });
        }

        data[itemIndex] = { ...data[itemIndex], title };
        writeData(data);

        res.status(200).json(data[itemIndex]);

    }
    else {
        res.setHeader("Allow", ["DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
