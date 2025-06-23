"use client";
import Services from '../../components/Services';
import { usePathname } from 'next/navigation';
export default function RealServicesPage() {
  const pathname = usePathname();
  return <Services key={pathname} />;
} 