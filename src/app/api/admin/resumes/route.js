import { NextResponse } from 'next/server';

export async function GET(request) {
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

    const [rows] = await connection.execute(
      'SELECT id, name, email, message, resume_file, applied_at FROM career_applications ORDER BY id DESC'
    );
    await connection.end();

    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching resume applications:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch applications from database' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
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

    await connection.execute('DELETE FROM career_applications WHERE id = ?', [id]);
    await connection.end();

    return NextResponse.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete application' },
      { status: 500 }
    );
  }
}
