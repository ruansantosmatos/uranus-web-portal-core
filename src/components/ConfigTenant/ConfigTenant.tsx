import { getEnvsByServer } from '@/utils'
import { ClientConfigProvider, AuthProvider } from '@projectengine-team/vulcano-react-auth/client'

interface ConfigTenantProviderProps {
  children: React.ReactNode
}

export async function ConfigTenant({ children }: ConfigTenantProviderProps) {
  const { href, configs } = await getEnvsByServer()

  return (
    <ClientConfigProvider environmentVars={configs}>
      <AuthProvider href={href}>{children}</AuthProvider>
    </ClientConfigProvider>
  )
}
