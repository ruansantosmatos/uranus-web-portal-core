"use server"
import { getEnvs } from "@projectengine-team/vulcano-react-auth/server"
import { cookies } from "next/headers"

export async function getEnvsByServer() {
    try {

        const host = (await cookies()).get("host")?.value || ""
        
        const protocol = (await cookies()).get("protocol")?.value || "http"

        const href = `${protocol}://develop`

        console.log('href ==>', href)
        const configs = await getEnvs({ folder: "uranus-web-portal-core", url: 'https://develop.uranus.aureaphigital.com/' })




        return {
            configs,
            href
        }

    }
    catch (error) {
        throw `falha na busca das configurações - ${error}`
    }
}