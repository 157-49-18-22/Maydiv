"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SEODashboard from '../../../components/admin/SEODashboard';

export default function SEOAdminPage() {
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem('adminAuth');
    if (!authData) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="admin-seo-page">
      <SEODashboard />
    </div>
  );
}

