import { RootLayout } from '@/components/RootLayout'
import { ConfigTenant } from '@/components/ConfigTenant'

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body>
        <ConfigTenant>
          <RootLayout>{children}</RootLayout>
        </ConfigTenant>
      </body>
    </html>
  )
}
