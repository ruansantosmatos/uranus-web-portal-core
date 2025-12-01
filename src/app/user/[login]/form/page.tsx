import { useEffect } from 'react'
import { TypeForm } from '@/types'
import { getHeadersFetch } from '@/utils'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  NavigationList,
  NavigationItem,
  NavigationLink,
  NavigationSeparator,
  Navigation
} from '@projectengine-team/hefesto'

export default function FormUser() {
  const route = useRouter()

  const headers = getHeadersFetch()

  const params = useParams<{ login: string }>()

  const searchParams = useSearchParams()

  const typeForm: TypeForm = (searchParams.get('type') as TypeForm) ?? 'create'

  useEffect(() => {
    console.log('TIPO FORMULÁRIO ==>', typeForm)
  }, [])

  function handleRoute(path: string) {
    route.push(path)
  }

  return (
    <section className="h-screen w-full bg-amber-400">
      <div className="flex w-full items-center justify-between px-5 py-2">
        <Navigation>
          <NavigationList>
            <NavigationItem>
              <NavigationLink onClick={() => handleRoute('/user')}>Usuários</NavigationLink>
            </NavigationItem>
            {/* <NavigationSeparator />
                        <NavigationItem>
                            <NavigationLink>{user.login ?? 'Carregando..'}</NavigationLink>
                        </NavigationItem> */}
          </NavigationList>
        </Navigation>
      </div>
    </section>
  )
}
