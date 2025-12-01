'use client'
import '@projectengine-team/hefesto/dist/hefesto.css'
import '../../styles/./globals.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { LayoutGrid, LogOut } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import Logo from '../../../public/logo_horizontal_default.svg'
import UranusIcon from '../../../public/mini-default_logo.svg'
import HeliosIcon from '../../../public/Helios_icon_default.svg'
import { SidebarNavigation } from '@/components/SidebarNavigation'
import {
  Dropdown,
  DropdownItem,
  ThemeProvider,
  DropdownGroup,
  SidebarTrigger,
  DropdownTrigger,
  SidebarProvider,
  DropdownContent
} from '@projectengine-team/hefesto'
import { URLParamsProvider } from '@/providers'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider storageTheme>
      <SidebarProvider>
        <URLParamsProvider>
          <main className={'bg-foreground h-screen w-screen overflow-y-auto dark:bg-(--background)'}>
            <div className="bg-light flex h-14 w-full shadow-md shadow-gray-500/15 dark:border-b dark:border-b-gray-100 dark:bg-(--background) dark:shadow-none">
              <div className="xl:[20%] hidden h-full w-[20%] items-center pl-5 sm:flex sm:w-[30%] md:w-[30%] lg:w-[20%]">
                <Image src={Logo} alt={'logo_horizontal_default'} className={'w-40 object-contain'} />
              </div>
              <div className="flex h-full w-1/2 items-center gap-2 px-3.5 text-lg font-semibold text-gray-700 sm:hidden dark:text-(--primary)">
                <SidebarTrigger />
              </div>
              <div className="flex h-full w-1/2 flex-row-reverse items-center justify-end sm:w-[80%] md:w-[70%] lg:w-[80%]">
                <div className="flex h-full w-full flex-row-reverse items-center justify-start gap-4 px-3 text-gray-700 sm:px-5">
                  <button className="cursor-pointer dark:text-(--primary)">
                    <LogOut />
                  </button>
                  <Dropdown>
                    <DropdownTrigger className="cursor-pointer dark:text-(--primary)">
                      <LayoutGrid />
                    </DropdownTrigger>
                    <DropdownContent avoidCollisions collisionPadding={10} className="min-w-[100px]">
                      <DropdownGroup className="flex flex-row p-2">
                        <DropdownItem className="flex flex-col items-center justify-center p-2 uppercase">
                          <Image src={HeliosIcon} alt={'logo-helios'} className={'w-12 object-contain'} />
                          <span>Hélios</span>
                        </DropdownItem>
                        <DropdownItem className="flex flex-col items-center justify-center p-2 uppercase">
                          <Image src={UranusIcon} alt={'logo-uranus'} className={'w-12 object-contain'} />
                          <span>Uranus</span>
                        </DropdownItem>
                      </DropdownGroup>
                    </DropdownContent>
                  </Dropdown>
                  <ThemeSwitcher />
                  <div className="hidden items-center text-gray-700 sm:flex sm:h-full sm:justify-center">
                    <SidebarTrigger />
                  </div>
                </div>
              </div>
            </div>
            <SidebarNavigation />
            <div className="h-[92%] w-full">{children}</div>
          </main>
        </URLParamsProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
