import { createContext, Dispatch, SetStateAction } from 'react'

export type URLParamsContextProps = {
  getUrlSearchParams: () => void
  urlParams: Record<string, string>
  setUrlParams: Dispatch<SetStateAction<Record<string, string>>>
}

export const URLParamsContext = createContext<URLParamsContextProps>({} as URLParamsContextProps)
