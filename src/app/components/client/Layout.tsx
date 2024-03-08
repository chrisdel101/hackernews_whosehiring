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
  const {currentMonth, currentYear, setCurrentMonth, setCurrentYear} = useHandleRedirect()
 
  

  // console.log('currentMonth', Object.keys(Months)[Object.values(Months).indexOf(currentMonth)])
  
// const redirect = (param: any) => {
//   const value: keyof typeof Months | keyof typeof Years = param?.target?.value
//   console.log('redirect', param?.target?.value)
//   console.log('path', pathname)

//   const {monthNumber, year} = parsePathName(pathname) 

//   if (Months[value]) {
//     setCurrentMonth(Months[value])
//     console.log('Months', Months[value])

//     const monthKey: keyof typeof MonthsNumber = param?.target?.value
//     const monthNumber = MonthsNumber[monthKey]
//     console.log('Months', MonthsNumber[monthKey])
//     const newPath = `/${year}/${monthNumber}`
//     router.push(newPath)

//   } else if (Years[value]) {
//     setCurrentYear(Years[value])
//    const newPath = `/${currentYear}/${month}`
//     router.push(newPath)
//   }
// }
   const handleChange = (event: SelectChangeEvent) => {
    const value = (event?.target as HTMLInputElement)?.value;
    
    if (Months[value as keyof typeof Months]) {
        setCurrentMonth(Months[value as keyof typeof Months]);
        // console.log('Months', Months[value as keyof typeof Months]);

        // const monthKey: keyof typeof MonthsNumber = param?.target?.value;
        // const monthNumber = MonthsNumber[monthKey];
        // console.log('Months', MonthsNumber[monthKey]);
        // const newPath = `/${year}/${monthNumber}`;
        // router.push(newPath);
    } else if (Years[value as keyof typeof Years]) {
        setCurrentYear(Years[value as keyof typeof Years]);
        // const newPath = `/${currentYear}/${month}`;
        // router.push(newPath);
    }

   }

  return (
    <div>
      <NavAppBar handleChange={handleChange} params={{currentMonth, currentYear}} />
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}
