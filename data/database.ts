import fs from "fs";
import path from "path";

export interface DataItem {
  id: number;
  title: string;
}

type DataArray = DataItem[];

const filePath = path.join(process.cwd(), "data", "database.json");

const ensureFileExists = (): void => {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
  }
};

export const readData = (): DataArray => {
  ensureFileExists();
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as DataArray;
  } catch (error) {
    console.error("Ошибка чтения файла:", error);
    return [];
  }
};

export const writeData = (data: DataArray): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Ошибка записи в файл:", error);
  }
};
