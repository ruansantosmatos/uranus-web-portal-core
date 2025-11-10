import { ConfigTenantProvider } from "@/components/ConfigTenantProvider";
import { RootLayout } from "@/components/RootLayout";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body>
        <ConfigTenantProvider>
          <RootLayout>
            {children}
          </RootLayout>
        </ConfigTenantProvider>
      </body>
    </html>
  )
}
