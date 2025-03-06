/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, prefer-const */
import { NextResponse } from "next/server";
import { processQuery, addDocumentToVectorDB } from "@/utils/rag";
import { processDocumentForRag } from "@/utils/chunking";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 },
      );
    }

    const response = await processQuery(query);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Error in RAG API route:", error);

    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}

// Endpoint to add documents to your vector database
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { text, metadata } = body;

    if (!text) {
      return NextResponse.json(
        { error: "Text parameter is required" },
        { status: 400 },
      );
    }

    // Process document with chunking for larger texts
    await processDocumentForRag(text, metadata || {}, addDocumentToVectorDB);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error adding document:", error);

    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}
