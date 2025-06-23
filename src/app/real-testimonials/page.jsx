"use client";
import Testimonials from '../../components/Testimonials';
import { usePathname } from 'next/navigation';
export default function RealTestimonialsPage() {
  const pathname = usePathname();
  return <Testimonials key={pathname} />;
} 