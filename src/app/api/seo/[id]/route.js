import { NextResponse } from 'next/server';

// PUT method for updating SEO data
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const seoData = await request.json();
    
    console.log('PUT /api/seo/[id] - Updating SEO data:', { id, body: seoData });
    
    // Forward the request to the backend
    const response = await fetch(`https://maydiv-backend.onrender.com/api/v1/seo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seoData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend API error response:', response.status, errorText);
      throw new Error(`Backend API error: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('SEO data updated successfully:', result);
    
    return NextResponse.json({
      success: true,
      message: 'SEO data updated successfully!',
      seoData: result.seoData || result,
      environment: 'backend-database'
    });
    
  } catch (error) {
    console.error('Error updating SEO data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE method for deleting SEO data
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    console.log('DELETE /api/seo/[id] - Deleting SEO data:', id);
    
    // Forward the request to the backend
    const response = await fetch(`https://maydiv-backend.onrender.com/api/v1/seo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend API error response:', response.status, errorText);
      throw new Error(`Backend API error: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('SEO data deleted successfully:', result);
    
    return NextResponse.json({
      success: true,
      message: 'SEO data deleted successfully!',
      environment: 'backend-database'
    });
    
  } catch (error) {
    console.error('Error deleting SEO data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
