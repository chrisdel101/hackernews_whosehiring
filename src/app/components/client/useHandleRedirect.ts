/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'
import { getMontNumberFromName, getMonthKeyFromNumber, parsePathName } from '@/app/utils';
import { Months, MonthsNumber, Years } from '@/app/constants';
import { MonthKey } from '@/app/types';


export const useHandleRedirect = () => {
    const pathname = usePathname()
    const router = useRouter()
    const {monthNumber, year} = parsePathName(pathname) 
    // console.log('hh', monthNumber, year)
    // console.log('gg', getMonthKeyFromNumber(monthNumber))
    
    
    const [currentMonth, setCurrentMonth] = useState<Months>(Months?.[getMonthKeyFromNumber(monthNumber) as MonthKey])

    const [currentYear, setCurrentYear] = useState<Years>(year as Years)

    useEffect(() => {
        // console.log('currentMonth', currentMonth)
       // console.log('Months', Months[value as keyof typeof Months]);
       const monthNum = getMontNumberFromName(currentMonth)
       console.log('QWRQW', monthNum)
       
        router.push(`/${currentYear}/${monthNum}`)
    }, [currentMonth])

    useEffect(() => {
        // console.log('currentYear', currentYear)
        // console.log('currentMonth', currentMonth)
        const monthNum = getMontNumberFromName(currentMonth)
        console.log('QWRQW', monthNum)
       
        router.push(`/${currentYear}/${monthNum}`)
    }, [currentYear])
   
    return {currentMonth, currentYear, setCurrentMonth, setCurrentYear}
} 