'use client';

import { useEffect } from 'react';

export default function AdminStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .animate-slide-in {
        animation: slideIn 0.5s ease-out;
      }
      
      .animate-pulse-slow {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 3px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }
      
      .stats-card {
        position: relative;
        overflow: hidden;
      }
      
      .stats-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      }
      
      .stats-card:nth-child(1)::before { background: linear-gradient(90deg, #3b82f6, #1d4ed8); }
      .stats-card:nth-child(2)::before { background: linear-gradient(90deg, #10b981, #059669); }
      .stats-card:nth-child(3)::before { background: linear-gradient(90deg, #8b5cf6, #7c3aed); }
      .stats-card:nth-child(4)::before { background: linear-gradient(90deg, #f59e0b, #d97706); }
      
      .file-item:hover {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        transform: translateX(4px);
        transition: all 0.2s ease;
      }
      
      .file-item.selected {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        border-left: 3px solid #3b82f6;
      }
      
      .tab-active {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        color: #1e40af;
        font-weight: 600;
        position: relative;
      }
      
      .tab-active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: #3b82f6;
        border-radius: 1px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
} 