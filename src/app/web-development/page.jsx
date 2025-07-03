"use client";
import Projects from '../../components/Projects';
import { usePathname } from 'next/navigation';
import WhatsappLottie from '../../components/WhatsappLottie';
export default function RealProjectsPage() {
  const pathname = usePathname();
  return (
    <main>
      <WhatsappLottie />
      <Projects key={pathname} />
    </main>
  );
} 