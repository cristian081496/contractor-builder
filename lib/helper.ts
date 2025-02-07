import * as fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'lib/data.json');

// function to read the JSON file
export async function readDataFile() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

// function to write to the JSON file
export async function writeDataFile(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}