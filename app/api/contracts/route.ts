import { readDataFile, writeDataFile } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await readDataFile();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read contracts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newContract = await req.json();
    const data = await readDataFile();
    const contracts = JSON.parse(data);

    contracts.push(newContract);
    await writeDataFile(contracts);

    return NextResponse.json({ message: "Contract added" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add contract" },
      { status: 500 }
    );
  }
}
