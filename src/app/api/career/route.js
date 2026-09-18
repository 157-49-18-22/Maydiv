import { NextResponse } from 'next/server';

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
    }

    // Direct MySQL connection to Hostinger Remote Database
    let dbSuccess = false;
    let dbErrorMessage = '';

    try {
      const mysql = await import('mysql2/promise');
      const connection = await mysql.createConnection({
        host: 'srv1741.hstgr.io',
        port: 3306,
        user: 'u435351083_u123456_maydiv',
        password: 'Maydivjms1@3',
        database: 'u435351083_u123456_maydiv',
        connectTimeout: 10000
      });

      await connection.execute(
        'INSERT INTO career_applications (name, email, message, resume_file, applied_at) VALUES (?, ?, ?, ?, NOW())',
        [name, email, message, savedFileName]
      );
      await connection.end();
      dbSuccess = true;
    } catch (dbErr) {
      console.error('Remote MySQL connection error:', dbErr.message);
      dbErrorMessage = dbErr.message;
    }

    if (!dbSuccess) {
      return NextResponse.json(
        { success: false, error: `Database saving issue: ${dbErrorMessage}. Make sure Remote MySQL 'Any Host' is created on Hostinger.` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your application has been submitted and saved to the database successfully.',
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
