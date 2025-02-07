import * as fs from 'fs/promises';
import { join } from 'path';

let folderName = "./tmp";
if(process.env.APP_ENV === "LIVE") folderName = "/tmp";

const dataFilePath = join(folderName, 'data.json');

// function to read the JSON file
export async function readDataFile() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await writeDataFile([]);
      return [];
    }
    console.error('Error reading file:', error);
    throw error;
  }
}

// function to write to the JSON file
export async function writeDataFile(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}