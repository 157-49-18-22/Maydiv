import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const isDownload = searchParams.get('download') === 'true';

    if (!id) {
      return new Response('Application ID is required', { status: 400 });
    }

    const mysql = await import('mysql2/promise');
    const connection = await mysql.createConnection({
      host: 'srv1741.hstgr.io',
      port: 3306,
      user: 'u435351083_u123456_maydiv',
      password: 'Maydivjms1@3',
      database: 'u435351083_u123456_maydiv',
      connectTimeout: 10000
    });

    const [rows] = await connection.execute(
      'SELECT resume_file, file_data, file_mime FROM career_applications WHERE id = ?',
      [id]
    );
    await connection.end();

    if (!rows || rows.length === 0 || !rows[0].file_data) {
      return new Response('Resume file not found in database for this application.', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    const app = rows[0];
    const fileBuffer = Buffer.from(app.file_data, 'base64');
    const mimeType = app.file_mime || 'application/pdf';
    const fileName = app.resume_file || 'resume.pdf';

    const disposition = isDownload ? `attachment; filename="${fileName}"` : `inline; filename="${fileName}"`;

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': disposition,
        'Content-Length': fileBuffer.length.toString(),
      }
    });
  } catch (error) {
    console.error('Error serving resume file:', error);
    return new Response(`Error loading resume: ${error.message}`, { status: 500 });
  }
}
