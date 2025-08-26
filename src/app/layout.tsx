import Script from 'next/script'

export const metadata = {
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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WZELL05P2J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZELL05P2J');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
