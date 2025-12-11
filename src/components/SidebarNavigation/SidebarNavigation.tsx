'use client'
import { useRouter } from 'next/navigation'
import { Search, Smartphone, User } from 'lucide-react'
import {
  Sidebar,
  Accordion,
  useSidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarButton,
  SidebarContent,
  SidebarMenuSub,
  AccordionContent,
  AccordionTrigger,
  SidebarGroupLabel,
  SidebarMenuSubItem,
  SidebarGroupContent
} from '@projectengine-team/hefesto'

export function SidebarNavigation() {
  const route = useRouter()

  const { setOpen, setOpenMobile, open } = useSidebar()

  function navigation(path: string) {
    route.push(path)

    setOpen(false)
    setOpenMobile(false)
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroupContent className="pt-10 sm:pt-8">
          <Accordion>
            <SidebarGroup className='p-2'>
              <AccordionTrigger>
                <SidebarGroupLabel>
                  <SidebarButton collapseIcon>
                    <div className='inline-flex justify-center items-end gap-2'>
                      <User size={22} />
                      Contas
                    </div>
                  </SidebarButton>
                </SidebarGroupLabel>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarMenu>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarButton>
                        Cliente
                      </SidebarButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarButton onClick={() => navigation('/user')}>Usuários</SidebarButton>
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
            <SidebarGroup className='p-2'>
              <AccordionTrigger>
                <SidebarGroupLabel>
                  <SidebarButton collapseIcon>
                    <div className='inline-flex justify-center items-end gap-2'>
                      <Smartphone size={20} />
                      Equipamentos
                    </div>
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
            <SidebarGroup className='p-2'>
              <AccordionTrigger>
                <SidebarGroupLabel>
                  <SidebarButton collapseIcon>
                    <div className='inline-flex justify-center items-end gap-2'>
                      <Search size={20} />
                      Consultas
                    </div>
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
  )
}
