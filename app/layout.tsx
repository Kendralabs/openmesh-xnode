'use client'

// import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import 'node_modules/react-modal-video/css/modal-video.css'
import '../styles/index.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import LateralNav from '@/components/LateralNav'

export default function RootLayout({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="max-w-screen w-full bg-white">
        <Providers>
          <div className="flex">
            <LateralNav onValueChange={console.log('teste')} />
            <div className="mx-auto">
              <Header />
              {children}
            </div>
          </div>

          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}
