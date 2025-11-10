'use client'
import '@projectengine-team/hefesto/dist/hefesto.css'
import '@/styles/globals.css'
import Image from 'next/image'
import { LayoutGrid, LogOut, User } from 'lucide-react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import UranusIcon from '../../public/mini-default_logo.svg'
import HeliosIcon from '../../public/Helios_icon_default.svg'
import Logo from '../../public/logo_horizontal_default.svg'
import {
  Sidebar,
  Dropdown,
  Accordion,
  SidebarMenu,
  DropdownItem,
  SidebarGroup,
  ThemeProvider,
  DropdownGroup,
  SidebarButton,
  SidebarContent,
  SidebarTrigger,
  SidebarMenuSub,
  DropdownTrigger,
  SidebarProvider,
  DropdownContent,
  SidebarGroupLabel,
  AccordionTrigger,
  AccordionContent,
  SidebarMenuSubItem,
  SidebarGroupContent,
} from '@projectengine-team/hefesto'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider storageTheme>
          <SidebarProvider>
            <main className={'bg-foreground h-screen w-screen'}>
              <div className="bg-light flex h-16 w-full shadow-md shadow-gray-500/15 dark:bg-(--background) dark:shadow-white">
                <div className="xl:[20%] hidden h-full w-[20%] items-center pl-5 sm:flex sm:w-[30%] md:w-[30%] lg:w-[20%]">
                  <Image src={Logo} alt={'logo_horizontal_default'} className={'w-[180px] object-contain'} />
                </div>
                <div className="flex h-full w-1/2 items-center gap-2 px-3.5 text-gray-700 dark:text-(--primary) sm:hidden">
                  <SidebarTrigger />
                  <span>Usuários</span>
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
              <div>
                <Sidebar>
                  <SidebarContent>
                    <SidebarGroupContent className='pt-10 sm:pt-8'>
                      <Accordion>
                        <SidebarGroup>
                          <AccordionTrigger>
                            <SidebarGroupLabel>
                              <SidebarButton collapseIcon>
                                Contas
                              </SidebarButton>
                            </SidebarGroupLabel>
                          </AccordionTrigger>
                          <AccordionContent>
                            <SidebarMenu>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <SidebarButton>Cliente</SidebarButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem>
                                  <SidebarButton>Usuários</SidebarButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem>
                                  <SidebarButton>Grupos</SidebarButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem>
                                  <SidebarButton>Departamentos</SidebarButton>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </SidebarMenu>
                          </AccordionContent>
                        </SidebarGroup>
                      </Accordion>
                      <Accordion>
                        <SidebarGroup>
                          <AccordionTrigger>
                            <SidebarGroupLabel>
                              <SidebarButton collapseIcon>
                                Equipamentos
                              </SidebarButton>
                            </SidebarGroupLabel>
                          </AccordionTrigger>
                          <AccordionContent>
                            <SidebarMenu>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <SidebarButton>Aparelhos</SidebarButton>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </SidebarMenu>
                          </AccordionContent>
                        </SidebarGroup>
                      </Accordion>
                      <Accordion>
                        <SidebarGroup>
                          <AccordionTrigger>
                            <SidebarGroupLabel>
                              <SidebarButton collapseIcon>
                                Consultas
                              </SidebarButton>
                            </SidebarGroupLabel>
                          </AccordionTrigger>
                          <AccordionContent>
                            <SidebarMenu>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <SidebarButton>Consulta Veículo</SidebarButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem>
                                  <SidebarButton>Consulta Condutor</SidebarButton>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </SidebarMenu>
                          </AccordionContent>
                        </SidebarGroup>
                      </Accordion>
                    </SidebarGroupContent>
                  </SidebarContent>
                </Sidebar>
                {children}
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
