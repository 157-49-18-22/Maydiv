import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

// Metadata
// title: 'MayDiv - Interactive Digital Solutions'
// description: 'Step into the future with MayDiv! We offer a range of digital solutions that can transform your business landscape.'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
} 