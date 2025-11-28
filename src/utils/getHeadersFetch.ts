import { useAuth, useClientConfig } from '@projectengine-team/vulcano-react-auth/client'

export function getHeadersFetch() {
  const auth = useAuth()

  const env = useClientConfig()

  const token = auth.user?.access_token ?? ''

  const configRequest: HeadersInit = {
    'X-GatewayUrl': env.APIM_URL,
    'X-Tenant': env.IS_TENANT || '',
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }

  return configRequest
}
