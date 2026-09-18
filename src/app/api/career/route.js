import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const message = formData.get('message') || '';
    const resume = formData.get('resume');

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields (Name, Email, Message).' },
        { status: 400 }
      );
    }

    let savedFileName = 'No file uploaded';
    if (resume && typeof resume === 'object' && resume.size > 0) {
      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
      await mkdir(uploadDir, { recursive: true });

      const sanitizedName = (resume.name || 'resume.pdf').replace(/[^a-zA-Z0-9.-]/g, '_');
      savedFileName = `${Date.now()}_${sanitizedName}`;
      const filePath = path.join(uploadDir, savedFileName);

      await writeFile(filePath, buffer);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your application has been submitted successfully.',
      data: { name, email, resume: savedFileName }
    });
  } catch (error) {
    console.error('Error handling career application:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
