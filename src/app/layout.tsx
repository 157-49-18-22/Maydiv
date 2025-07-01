export const metadata = {
  title: 'Maydiv',
  description: 'Maydiv Website',
  icons: {
    icon: '/Lo.png',
  },
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
