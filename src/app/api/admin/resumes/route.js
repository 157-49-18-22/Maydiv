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
    const body = await request.json().catch(() => ({}));
    const { searchParams } = new URL(request.url);
    
    const id = body.id || searchParams.get('id');
    const ids = body.ids || (searchParams.get('ids') ? searchParams.get('ids').split(',') : null);
    const date = body.date || searchParams.get('date');
    const olderThanDays = body.olderThanDays || searchParams.get('olderThanDays');

    const mysql = await import('mysql2/promise');
    const connection = await mysql.createConnection({
      host: 'srv1741.hstgr.io',
      port: 3306,
      user: 'u435351083_u123456_maydiv',
      password: 'Maydivjms1@3',
      database: 'u435351083_u123456_maydiv',
      connectTimeout: 10000
    });

    let deletedCount = 0;

    if (ids && Array.isArray(ids) && ids.length > 0) {
      // Bulk delete by array of IDs
      const placeholders = ids.map(() => '?').join(',');
      const [res] = await connection.execute(
        `DELETE FROM career_applications WHERE id IN (${placeholders})`,
        ids
      );
      deletedCount = res.affectedRows;
    } else if (id) {
      // Single delete
      const [res] = await connection.execute('DELETE FROM career_applications WHERE id = ?', [id]);
      deletedCount = res.affectedRows;
    } else if (date) {
      // Delete all applications for a specific date (YYYY-MM-DD)
      const [res] = await connection.execute('DELETE FROM career_applications WHERE DATE(applied_at) = ?', [date]);
      deletedCount = res.affectedRows;
    } else if (olderThanDays) {
      // Delete older than N days (e.g., 7 for 1 week, 30 for 1 month)
      const days = parseInt(olderThanDays, 10);
      const [res] = await connection.execute(
        'DELETE FROM career_applications WHERE applied_at < DATE_SUB(NOW(), INTERVAL ? DAY)',
        [days]
      );
      deletedCount = res.affectedRows;
    } else {
      await connection.end();
      return NextResponse.json({ success: false, error: 'No delete criteria provided (id, ids, date, or olderThanDays)' }, { status: 400 });
    }

    await connection.end();
    return NextResponse.json({ 
      success: true, 
      message: `Successfully deleted ${deletedCount} application(s).`,
      deletedCount 
    });
  } catch (error) {
    console.error('Error deleting applications:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete applications' },
      { status: 500 }
    );
  }
}
