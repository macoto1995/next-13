
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>Next.js 13</title>
      </head>
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
