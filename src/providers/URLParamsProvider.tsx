import { ReactNode, useState } from 'react'
import { URLParamsContext } from '@/context'
import { useSearchParams } from 'next/navigation'

export function URLParamsProvider({ children }: { children: ReactNode }) {
  const query = useSearchParams()
  const [urlParams, setUrlParams] = useState<Record<string, string>>({})

  function getUrlSearchParams() {
    query.forEach((value, key) => setUrlParams({ ...urlParams, [key]: value }))
  }

  return (
    <URLParamsContext.Provider value={{ getUrlSearchParams, urlParams, setUrlParams }}>
      {children}
    </URLParamsContext.Provider>
  )
}
