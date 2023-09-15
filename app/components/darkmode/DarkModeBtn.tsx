'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

export default function DarkModeBtn() {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <>
      {currentTheme === 'dark' ? (
        <button onClick={() => setTheme('light')}>
          <DarkModeIcon />
        </button>
      ) : (
        <button onClick={() => setTheme('dark')}>
          <WbSunnyIcon />
        </button>
      )}
    </>
  )
}
