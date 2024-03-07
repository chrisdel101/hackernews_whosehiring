'use client'
import NavAppBar from '../material/NavAppBar'
import styles from '../../page.module.css'
import { useRouter, usePathname } from 'next/navigation'
import { parsePathName, verifyInputIsMonthYear } from '@/app/utils'
import { Months, MonthsNumber, Years, currentMonthIndex, currentYearIndex } from '@/app/constants'
import { useState } from 'react'
export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [currentMonth, setCurrentMonth] = useState<Months>(Months.FEBRUARY)
  const [currentYear, setCurrentYear] = useState<Years>(Years.TWENTY_FOUR)
  // console.log('currentMonth', Object.keys(Months)[Object.values(Months).indexOf(currentMonth)])
  
  const router = useRouter()
  const pathname = usePathname()

  const redirect = (param: any) => {
    const value: keyof typeof Months | keyof typeof Years = param?.target?.value
    console.log('redirect', param?.target?.value)
    console.log('path', pathname)
    const {month, year} = parsePathName(pathname) 
    if (Months[value]) {
      setCurrentMonth(Months[value])
      console.log('Months', Months[value])

      const monthKey: keyof typeof MonthsNumber = param?.target?.value
      console.log('Months', MonthsNumber[monthKey])
      const newPath = `/${year}/${currentMonth}`
      router.push(newPath)

    } else if (Years[value]) {
      setCurrentYear(Years[value])
     const newPath = `/${currentYear}/${month}`
      router.push(newPath)
    }
  }
  return (
    <div>
      <NavAppBar handleChange={redirect} params={{currentMonth, currentYear}} />
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}
