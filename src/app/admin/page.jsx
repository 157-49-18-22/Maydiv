'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiRefreshCw } from 'react-icons/fi';

// Import components
import AdminStyles from '@/components/admin/AdminStyles';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCards from '@/components/admin/StatsCards';
import FileExplorer from '@/components/admin/FileExplorer';
import CodeViewer from '@/components/admin/CodeViewer';

export default function AdminDashboard() {
  const [codeData, setCodeData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('app');
  const [editingFile, setEditingFile] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch code data
  const fetchCodeData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/code?type=all');
      const data = await response.json();
      if (data.success) {
        setCodeData(data.data);
      }
    } catch (error) {
      console.error('Error fetching code data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem('adminAuth');
    if (!authData) {
      router.push('/admin/login');
      return;
    }
    
    try {
      const userData = JSON.parse(authData);
      setUser(userData);
      fetchCodeData();
      fetchStats();
    } catch (error) {
      console.error('Error parsing auth data:', error);
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  // Filter files based on search term
  const filterFiles = (items) => {
    if (!searchTerm) return items;
    
    return items.filter(item => {
      if (item.type === 'file') {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.path.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (item.type === 'directory' && item.children) {
        const filteredChildren = filterFiles(item.children);
        return filteredChildren.length > 0 || 
               item.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  };



  // Handle file selection
  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setEditingFile(null);
    setEditContent('');
  };

  // Handle file edit
  const handleEditFile = () => {
    if (!selectedFile) return;
    // Restrict editing to src/app pages for non-admin roles
    try {
      const authData = localStorage.getItem('adminAuth');
      const currentUser = authData ? JSON.parse(authData) : null;
      const isAdmin = currentUser?.role === 'admin';
      const isAppPage = selectedFile.path?.startsWith('src/app/');
      if (!isAdmin && !isAppPage) {
        alert('You can only edit files under src/app');
        return;
      }
    } catch {}
    setEditingFile(selectedFile);
    setEditContent(selectedFile.content || '');
  };

  // Handle save file
  const handleSaveFile = async () => {
    if (!editingFile || editContent === undefined) return;

    try {
      const response = await fetch('/api/admin/file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath: editingFile.path,
          content: editContent
        })
      });

      const data = await response.json();
      if (data.success) {
        setEditingFile(null);
        setEditContent('');
        fetchCodeData(); // Refresh data
        alert('File saved successfully!');
      } else {
        alert('Error saving file: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Error saving file');
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingFile(null);
    setEditContent('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading codebase...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminStyles />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <AdminHeader 
          user={user} 
          onRefresh={() => { fetchCodeData(); fetchStats(); }} 
          onLogout={handleLogout} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StatsCards stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <FileExplorer 
                codeData={codeData}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
              />
            </div>

            <div className="lg:col-span-2">
              <CodeViewer 
                selectedFile={selectedFile}
                editingFile={editingFile}
                editContent={editContent}
                setEditContent={setEditContent}
                onEditFile={handleEditFile}
                onSaveFile={handleSaveFile}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 