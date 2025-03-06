/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, prefer-const */
/**
 * Splits text into chunks with overlap for better retrieval
 */
export function chunkText(
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200,
): string[] {
  if (!text || text.length <= chunkSize) {
    return [text];
  }

  const chunks: string[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    // Calculate end index for this chunk
    let endIndex = Math.min(currentIndex + chunkSize, text.length);

    // Don't cut in the middle of sentences if possible
    if (endIndex < text.length) {
      // Look for sentence-ending punctuation
      const nextPeriod = text.indexOf(".", endIndex - 50);
      const nextExclamation = text.indexOf("!", endIndex - 50);
      const nextQuestion = text.indexOf("?", endIndex - 50);

      // Find the closest sentence end after the minimum chunk size
      const sentenceEndIndices = [
        nextPeriod,
        nextExclamation,
        nextQuestion,
      ].filter((index) => index !== -1 && index < endIndex + 50);

      if (sentenceEndIndices.length > 0) {
        endIndex = Math.min(...sentenceEndIndices) + 1; // Include the punctuation
      }
    }

    // Extract the chunk
    chunks.push(text.substring(currentIndex, endIndex).trim());

    // Move to next chunk start position, accounting for overlap
    currentIndex = endIndex - overlap;
  }

  return chunks;
}

/**
 * Preprocesses a document for RAG
 */
export async function processDocumentForRag(
  text: string,
  metadata: any = {},
  addToVectorDb: (text: string, metadata: any) => Promise<boolean>,
): Promise<boolean> {
  try {
    // Remove excessive whitespace
    const cleanedText = text
      .replace(/\n{3,}/g, "\n\n") // Replace 3+ newlines with 2
      .replace(/\s{2,}/g, " ") // Replace multiple spaces with single space
      .trim();

    // Create chunks
    const chunks = chunkText(cleanedText);

    // Add each chunk to the vector database
    for (let i = 0; i < chunks.length; i++) {
      await addToVectorDb(chunks[i], {
        ...metadata,
        chunkIndex: i,
        totalChunks: chunks.length,
      });
    }

    return true;
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
}
