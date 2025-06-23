"use client";
import Projects from '../../components/Projects';
import { usePathname } from 'next/navigation';
export default function RealProjectsPage() {
  const pathname = usePathname();
  return <Projects key={pathname} />;
} 