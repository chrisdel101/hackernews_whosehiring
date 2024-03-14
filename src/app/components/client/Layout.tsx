'use client'
import NavAppBar from '../material/NavAppBar'
import styles from '../../page.module.css'

import { Months, Years } from '@/app/constants'
import { useHandleRedirect } from './useHandleRedirect'
import { SelectChangeEvent } from '@mui/material'


export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { currentMonth, currentYear, setCurrentMonth, setCurrentYear } = useHandleRedirect()


  const handleChange = (event: SelectChangeEvent) => {
    const value = (event?.target as HTMLInputElement)?.value

    if (Months[value as keyof typeof Months]) {
      setCurrentMonth(Months[value as keyof typeof Months])
    } else if (Years[value as keyof typeof Years]) {
      setCurrentYear(Years[value as keyof typeof Years])
    }

  }

  return (
    <div>
      <NavAppBar handleChange={handleChange} params={{ currentMonth, currentYear }} />
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}
