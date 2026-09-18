import { NextResponse } from 'next/server';
import path from 'path';
import os from 'os';
import { writeFile, mkdir } from 'fs/promises';

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
      const sanitizedName = (resume.name || 'resume.pdf').replace(/[^a-zA-Z0-9.-]/g, '_');
      savedFileName = `${Date.now()}_${sanitizedName}`;

      try {
        // Handle serverless (Vercel/Lambda) vs local environment
        const uploadDir = path.join(os.tmpdir(), 'uploads', 'resumes');
        await mkdir(uploadDir, { recursive: true });
        const buffer = Buffer.from(await resume.arrayBuffer());
        await writeFile(path.join(uploadDir, savedFileName), buffer);
      } catch (fileErr) {
        console.warn('Local disk write skipped in serverless environment:', fileErr.message);
      }
    }

    // Forward to Hostinger career.php to save in Hostinger MySQL & Hostinger uploads folder
    try {
      const hostingerFormData = new FormData();
      hostingerFormData.append('name', name);
      hostingerFormData.append('email', email);
      hostingerFormData.append('message', message);
      if (resume && typeof resume === 'object' && resume.size > 0) {
        hostingerFormData.append('resume', resume);
      }

      const phpRes = await fetch('https://maydiv.com/career.php', {
        method: 'POST',
        body: hostingerFormData,
      });

      if (phpRes.ok) {
        const phpData = await phpRes.json();
        if (phpData.success) {
          return NextResponse.json({
            success: true,
            message: phpData.message || 'Thank you! Your application has been submitted successfully.'
          });
        }
      }
    } catch (forwardErr) {
      console.warn('Notice when forwarding to Hostinger career.php:', forwardErr.message);
    }

    // Direct MySQL connection if running on same server
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
      console.warn('Direct MySQL note:', dbErr.message);
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
