/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, prefer-const */
import { NextResponse } from "next/server";
import { processQuery, addDocumentToVectorDB } from "@/utils/rag";
import { processDocumentForRag } from "@/utils/chunking";

// Handles queries to the RAG system
export async function POST(request: Request) {
  try {
    // Receive query from the user
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 },
      );
    }
    // Function to process the query against the vector database
    const response = await processQuery(query);

    // return response to client
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
    // Receives text content and optional metadata
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

    // Run a success response
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error adding document:", error);

    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 },
    );
  }
}
