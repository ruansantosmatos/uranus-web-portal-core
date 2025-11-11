import { useAuth, useClientConfig } from '@projectengine-team/vulcano-react-auth/client'

export function getHeadersFetch() {
  const auth = useAuth()

  const env = useClientConfig()

  const token = auth.user?.access_token ?? ''

  const configRequest: HeadersInit = {
    'X-Tenant': env.IS_TENANT || '',
    'X-GatewayUrl': env.APIM_URL,
    Authorization: `Bearer ${token}`
  }

  return configRequest
}
