import { NextRequest, NextResponse } from 'next/server';
import pdfParseFork from 'pdf-parse-fork';

/**
 * API route for extracting text from a PDF file
 * This is a server-side implementation that handles PDF parsing
 */
export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    try {
      // Convert the file to an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Convert ArrayBuffer to Uint8Array (required by pdf-parse-fork)
      const uint8Array = new Uint8Array(arrayBuffer);

      // Parse the PDF using pdf-parse-fork
      const pdfData = await pdfParseFork(uint8Array);

      // Return the raw extracted text without any formatting
      return NextResponse.json({
        text: pdfData.text,
        info: {
          pageCount: pdfData.numpages,
          fileName: file.name
        }
      });
    } catch (pdfError: any) {
      console.error('Error parsing PDF:', pdfError);
      return NextResponse.json(
        { error: 'Failed to parse PDF content', details: pdfError?.message },
        { status: 422 }
      );
    }
  } catch (error: any) {
    console.error('Error extracting text from PDF:', error);
    return NextResponse.json(
      { error: 'Failed to extract text from PDF', details: error?.message },
      { status: 500 }
    );
  }
}
