'use client'
import { useEffect, useState } from 'react'
import { Check, Eclipse, MoonIcon, Sun } from 'lucide-react'
import {
  useTheme,
  Dropdown,
  DropdownItem,
  DropdownGroup,
  DropdownContent,
  DropdownTrigger
} from '@projectengine-team/hefesto'

type Theme = 'light' | 'dark'

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light')
  const { setTheme } = useTheme()

  useEffect(() => {
    loadThemeSelectTheme()
  }, [])

  function changeTheme(theme: 'light' | 'dark') {
    setTheme(theme)
    setCurrentTheme(theme)
  }

  function loadThemeSelectTheme() {
    setCurrentTheme(localStorage.getItem('theme') as Theme)
  }

  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer dark:text-(--primary)">
        <Eclipse />
      </DropdownTrigger>
      <DropdownContent avoidCollisions collisionPadding={10} className="min-w-[100px]">
        <DropdownGroup>
          <DropdownItem
            onClick={() => changeTheme('light')}
            className="flex items-center justify-start px-1.5 capitalize"
          >
            <Sun size={20} />
            <span>Light</span>
            {currentTheme === 'light' && <Check size={20} />}
          </DropdownItem>
          <DropdownItem
            onClick={() => changeTheme('dark')}
            className="flex items-center justify-start px-1.5 capitalize"
          >
            <MoonIcon size={20} />
            <span>Dark</span>
            {currentTheme === 'dark' && <Check size={20} />}
          </DropdownItem>
        </DropdownGroup>
      </DropdownContent>
    </Dropdown>
  )
}
