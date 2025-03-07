import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST, PUT } from "@/app/api/rag/route";
import { processQuery, addDocumentToVectorDB } from "@/utils/rag";
import { processDocumentForRag } from "@/utils/chunking";

// Mock dependencies
vi.mock("@/utils/rag", () => ({
  processQuery: vi.fn(),
  addDocumentToVectorDB: vi.fn(),
}));

vi.mock("@/utils/chunking", () => ({
  processDocumentForRag: vi.fn(),
}));

describe("RAG API Route", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("POST endpoint", () => {
    it("should return successful response with query results", async () => {
      // Mock implementation
      const mockResponse = "This is the answer to your query";
      vi.mocked(processQuery).mockResolvedValue(mockResponse);
      vi.mocked(processQuery).mockResolvedValue(mockResponse);

      // Create request
      const request = new NextRequest("http://localhost:3000/api/rag", {
        method: "POST",
        body: JSON.stringify({ query: "What is RAG?" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Execute handler
      const response = await POST(request);
      const responseData = await response.json();

      // Assertions
      expect(response.status).toBe(200);
      expect(processQuery).toHaveBeenCalledWith("What is RAG?");
      expect(responseData).toEqual({ response: mockResponse });
    });
    it("should return 400 error when query is missing", async () => {
      // Create request with missing query
      const request = new NextRequest("http://localhost:3000/api/rag", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Execute handler
      const response = await POST(request);
      const responseData = await response.json();

      // Assertions
      expect(response.status).toBe(400);
      expect(responseData).toEqual({ error: "Query parameter is required" });
      expect(processQuery).not.toHaveBeenCalled();
    });
    it("should return 500 error when processQuery throws an exception", async () => {
      // Mock implementation
      vi.mocked(processQuery).mockRejectedValue(
        new Error("Database connection error"),
      );

      // Create request
      const request = new NextRequest("http://localhost:3000/api/rag", {
        method: "POST",
        body: JSON.stringify({ query: "What is RAG?" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Execute handler
      const response = await POST(request);
      const responseData = await response.json();

      // Assertions
      expect(response.status).toBe(500);
      expect(responseData).toEqual({ error: "Database connection error" });
    });
  });

  describe("PUT endpoint", () => {
    it("should successfully add document to vector database", async () => {
      // Mock implementation
      vi.mocked(processDocumentForRag).mockResolvedValue(true);

      // Create request
      const request = new NextRequest("http://localhost:3000/api/rag", {
        method: "PUT",
        body: JSON.stringify({
          text: "This is a sample document for the vector database",
          metadata: { source: "test", author: "vitest" },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Execute handler
      const response = await PUT(request);
      const responseData = await response.json();

      // Assertions
      expect(response.status).toBe(200);
      expect(responseData).toEqual({ success: true });
      expect(processDocumentForRag).toHaveBeenCalledWith(
        "This is a sample document for the vector database",
        { source: "test", author: "vitest" },
        addDocumentToVectorDB,
      );
    });

    it("should handle empty metadata correctly", async () => {
      // Mock implementation
      vi.mocked(processDocumentForRag).mockResolvedValue(true);

      // Create request with no metadata
      const request = new NextRequest("http://localhost:3000/api/rag", {
        method: "PUT",
        body: JSON.stringify({
          text: "This is a sample document for the vector database",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Execute handler
      const response = await PUT(request);
      const responseData = await response.json();

      // Assertions
      expect(response.status).toBe(200);
      expect(responseData).toEqual({ success: true });
      expect(processDocumentForRag).toHaveBeenCalledWith(
        "This is a sample document for the vector database",
        {},
        addDocumentToVectorDB,
      );
    });
    it("should return 400 error when text is missing", async () => {
      // Create request with missing text
      const request = new NextRequest("http://localhost:3000/api/rag", {
        method: "PUT",
        body: JSON.stringify({ metadata: { source: "test" } }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Execute handler
      const response = await PUT(request);
      const responseData = await response.json();

      // Assertions
      expect(response.status).toBe(400);
      expect(responseData).toEqual({ error: "Text parameter is required" });
      expect(processDocumentForRag).not.toHaveBeenCalled();
    });

    it("should return 500 error when processDocumentForRag throws an exception", async () => {
      // Mock implementation
      vi.mocked(processDocumentForRag).mockRejectedValue(
        new Error("Processing error"),
      );

      // Create request
      const request = new NextRequest("http://localhost:3000/api/rag", {
        method: "PUT",
        body: JSON.stringify({
          text: "This is a sample document for the vector database",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Execute handler
      const response = await PUT(request);
      const responseData = await response.json();

      // Assertions
      expect(response.status).toBe(500);
      expect(responseData).toEqual({ error: "Processing error" });
    });
  });
});
