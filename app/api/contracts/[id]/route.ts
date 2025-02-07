import { NextRequest, NextResponse } from "next/server";

import { ContractType } from "@/types/contracts";
import { readDataFile, writeDataFile } from "@/lib/helper";

type ParamType = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: ParamType) {
  try {
    const { id } = await params;
    const contracts = await readDataFile();

    // Find contract by quoteId
    const contract = contracts.find((c: any) => c.quoteId === id);

    if (!contract) {
      return NextResponse.json(
        { error: `Contract with quoteId ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(contract);
  } catch (error) {
    console.error("Error fetching contract:", error);
    return NextResponse.json(
      { error: "Failed to fetch contract" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: ParamType) {
  try {
    const { id } = await params;
    const contracts = await readDataFile();

    const initialLength = contracts.length;
    const updatedContracts = contracts.filter((c: any) => c.quoteId !== id);

    if (updatedContracts.length === initialLength) {
      return NextResponse.json(
        { error: `Contract with quoteId ${id} not found` },
        { status: 404 }
      );
    }

    await writeDataFile(updatedContracts);

    return NextResponse.json({ message: "Contract deleted successfully" });
  } catch (error) {
    console.error("Error deleting contract:", error);
    return NextResponse.json(
      { error: "Failed to delete contract" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: ParamType) {
  try {
    const { contractor, items } = await req.json();
    const contracts = await readDataFile();
    const { id } = await params;
    const contractIndex = contracts.findIndex(
      (c: ContractType) => c.quoteId === id
    );

    if (contractIndex === -1) {
      return new Response(JSON.stringify({ error: "Contract not found" }), {
        status: 404,
      });
    }

    // Update contract details
    contracts[contractIndex] = {
      ...contracts[contractIndex],
      contractor,
      items,
    };

    // Save to file
    await writeDataFile(contracts);

    return new Response(
      JSON.stringify({ message: "Contract updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update contract" }),
      { status: 500 }
    );
  }
}
