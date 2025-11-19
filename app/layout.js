import Script from 'next/script'
import './globals.css'
import ClientLayout from './ClientLayout'

export const metadata = {
  title: 'Swift Techy - PC Hardware Blog',
  description: 'Your trusted source for PC hardware news and reviews',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-X7Y26M4QRV"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X7Y26M4QRV');
          `,
        }}
      />
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}