import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();
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

    // Try inserting into MySQL Database
    try {
      const mysql = await import('mysql2/promise');
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'u435351083_u123456_maydiv',
        password: 'Maydivjms1@3',
        database: 'u435351083_u123456_maydiv',
      });

      await connection.execute(
        'INSERT INTO career_applications (name, email, message, resume_file, applied_at) VALUES (?, ?, ?, ?, NOW())',
        [name, email, message, savedFileName]
      );
      await connection.end();
    } catch (dbErr) {
      console.warn('MySQL direct connection warning (saving locally succeeded):', dbErr.message);
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
