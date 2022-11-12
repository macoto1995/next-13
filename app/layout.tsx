import Head from 'next/head'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <Head>
        <title>Next.js 13</title>
      </Head>
      <body>
        <header>
          <div>
            <h1>
             Next 13
            </h1>
          </div>  
        </header>  
        {children}
      </body>
    </html>
  )
}
