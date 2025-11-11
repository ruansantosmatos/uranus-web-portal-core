'use server'
import { cookies } from 'next/headers'
import { getEnvs } from '@projectengine-team/vulcano-react-auth/server'

export async function getEnvsByServer() {
  try {
    const host = (await cookies()).get('host')?.value || ''
    const protocol = (await cookies()).get('protocol')?.value || 'http'

    const href = `${protocol}://${host}`
    const configs = await getEnvs({ folder: 'uranus-web-portal-core', url: href })

    return {
      configs,
      href
    }
  } catch (error) {
    throw `falha na busca das configurações cliente - ${error}`
  }
}
