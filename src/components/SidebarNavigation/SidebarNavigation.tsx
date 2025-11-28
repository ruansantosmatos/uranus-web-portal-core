'use client'
import { useRouter } from 'next/navigation'
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

  const { setOpen, setOpenMobile } = useSidebar()

  function navigation(path: string) {
    route.push(path)

    setOpen(false)
    setOpenMobile(false)
  }

  return (
    <Sidebar className="z-9999">
      <SidebarContent>
        <SidebarGroupContent className="pt-10 sm:pt-8">
          <Accordion>
            <SidebarGroup>
              <AccordionTrigger>
                <SidebarGroupLabel>
                  <SidebarButton collapseIcon>Contas</SidebarButton>
                </SidebarGroupLabel>
              </AccordionTrigger>
              <AccordionContent>
                <SidebarMenu>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarButton>Cliente</SidebarButton>
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
            <SidebarGroup>
              <AccordionTrigger>
                <SidebarGroupLabel>
                  <SidebarButton collapseIcon>Equipamentos</SidebarButton>
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
                  <SidebarButton collapseIcon>Consultas</SidebarButton>
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
